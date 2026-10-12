"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./SearchPage.module.css";
import { SearchResults } from "./components/SearchResults/SearchResults";
import {
  SearchFilters,
  type SearchFilter,
} from "./components/SearchFilters/SearchFilters";
import { SearchAdvancedFilters } from "./components/SearchAdvancedFilters/SearchAdvancedFilters";
import { SearchHistory } from "./components/SearchHistory/SearchHistory";
import { LocationFilter } from "./components/LocationFilter/LocationFilter";
import {
  SearchResultsToolbar,
  type SearchViewMode,
} from "./components/SearchResultsToolbar/SearchResultsToolbar";
import { SearchSkeleton } from "./components/SearchSkeleton/SearchSkeleton";
import {
  SearchQuickFilters,
  type QuickFilter,
} from "./components/SearchQuickFilters/SearchQuickFilters";
import { BusinessPreview } from "./components/BusinessPreview/BusinessPreview";
import type { SearchBusiness } from "./types/search.types";
import { useSearch } from "./hooks/useSearch";
import { useLocationFilter } from "./hooks/useLocationFilter";
import { distanceToMeters } from "./utils/distance";

const VALID_TYPES: SearchFilter[] = ["all", "user", "business", "video"];
const VALID_QUICK_FILTERS: QuickFilter[] = [
  "nearby",
  "rated",
  "verified",
  "favorites",
];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const typeParam = searchParams.get("type") as SearchFilter | null;
  const activeFilter =
    typeParam && VALID_TYPES.includes(typeParam) ? typeParam : "all";
  const category = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "relevance";
  const verifiedOnly = searchParams.get("verified") === "true";
  const minimumRating = Number(searchParams.get("rating") ?? 0);
  const radiusFromUrl = Number(searchParams.get("radius") ?? 1000);
  const quickFilters =
    searchParams
      .get("quick")
      ?.split(",")
      .filter((item): item is QuickFilter =>
        VALID_QUICK_FILTERS.includes(item as QuickFilter),
      ) ?? [];
  const [history, setHistory] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(
    Boolean(category || verifiedOnly || minimumRating || sort !== "relevance"),
  );
  const [viewMode, setViewMode] = useState<SearchViewMode>("grid");
  const [linkCopied, setLinkCopied] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [previewBusiness, setPreviewBusiness] = useState<SearchBusiness | null>(
    null,
  );
  const { isLoading, results, hasQuery } = useSearch(query);
  const location = useLocationFilter();

  useEffect(() => {
    if ([500, 1000, 2000, 5000].includes(radiusFromUrl))
      location.setRadiusMeters(radiusFromUrl);
  }, [radiusFromUrl, location.setRadiusMeters]);

  function updateUrl(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (
      !value ||
      value === "all" ||
      value === "relevance" ||
      value === "0" ||
      value === "false"
    )
      params.delete(key);
    else params.set(key, value);
    router.replace(`/search${params.size ? `?${params.toString()}` : ""}`);
  }

  useEffect(() => {
    try {
      setHistory(
        JSON.parse(localStorage.getItem("krona-search-history") ?? "[]"),
      );
    } catch {
      setHistory([]);
    }
    try {
      setFavoriteIds(
        JSON.parse(localStorage.getItem("krona-search-favorites") ?? "[]"),
      );
    } catch {
      setFavoriteIds([]);
    }
    const savedView = localStorage.getItem("krona-search-view");
    if (savedView === "grid" || savedView === "list") setViewMode(savedView);
  }, []);

  useEffect(() => {
    if (!query.trim()) return;
    const timer = window.setTimeout(() => {
      setHistory((current) => {
        const updated = [
          query.trim(),
          ...current.filter(
            (item) => item.toLowerCase() !== query.trim().toLowerCase(),
          ),
        ].slice(0, 8);
        localStorage.setItem("krona-search-history", JSON.stringify(updated));
        return updated;
      });
    }, 700);
    return () => window.clearTimeout(timer);
  }, [query]);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          results
            .filter((item) => item.type === "business")
            .map((item) => item.category),
        ),
      ).sort(),
    [results],
  );

  const refinedResults = useMemo(() => {
    const businessFiltersActive = Boolean(
      category || verifiedOnly || minimumRating || quickFilters.length,
    );
    let filtered = results.filter((result) => {
      if (activeFilter !== "all" && result.type !== activeFilter) return false;
      if (businessFiltersActive && result.type !== "business") return false;
      if (result.type !== "business") return true;
      const meters = distanceToMeters(result.distance);
      if (
        location.isEnabled &&
        (meters === null || meters > location.radiusMeters)
      )
        return false;
      if (category && result.category !== category) return false;
      if (verifiedOnly && !result.verified) return false;
      if (minimumRating && (result.rating ?? 0) < minimumRating) return false;
      if (quickFilters.includes("nearby") && (meters === null || meters > 1000))
        return false;
      if (quickFilters.includes("rated") && (result.rating ?? 0) < 4.5)
        return false;
      if (quickFilters.includes("verified") && !result.verified) return false;
      if (
        quickFilters.includes("favorites") &&
        !favoriteIds.includes(result.id)
      )
        return false;
      return true;
    });

    filtered = [...filtered].sort((a, b) => {
      if (sort === "distance")
        return (
          (a.type === "business"
            ? (distanceToMeters(a.distance) ?? Infinity)
            : Infinity) -
          (b.type === "business"
            ? (distanceToMeters(b.distance) ?? Infinity)
            : Infinity)
        );
      if (sort === "rating")
        return (
          (b.type === "business" ? (b.rating ?? 0) : 0) -
          (a.type === "business" ? (a.rating ?? 0) : 0)
        );
      if (sort === "popular") {
        const popularity = (item: typeof a) =>
          item.type === "user"
            ? (item.followers ?? 0)
            : item.type === "video"
              ? (item.views ?? 0)
              : (item.rating ?? 0);
        return popularity(b) - popularity(a);
      }
      return 0;
    });
    return filtered;
  }, [
    results,
    activeFilter,
    category,
    verifiedOnly,
    minimumRating,
    sort,
    location.isEnabled,
    location.radiusMeters,
    quickFilters,
    favoriteIds,
  ]);

  const counts = {
    all: results.length,
    user: results.filter((item) => item.type === "user").length,
    business: results.filter((item) => item.type === "business").length,
    video: results.filter((item) => item.type === "video").length,
  };
  const activeFilterCount = [
    activeFilter !== "all",
    Boolean(category),
    verifiedOnly,
    minimumRating > 0,
    sort !== "relevance",
    location.isEnabled,
    quickFilters.length > 0,
  ].filter(Boolean).length;

  function toggleQuickFilter(filter: QuickFilter) {
    const next = quickFilters.includes(filter)
      ? quickFilters.filter((item) => item !== filter)
      : [...quickFilters, filter];
    updateUrl("quick", next.join(","));
  }

  // Los favoritos y el tipo de vista se recuerdan en este navegador.
  function toggleFavorite(id: string) {
    setFavoriteIds((current) => {
      const updated = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      localStorage.setItem("krona-search-favorites", JSON.stringify(updated));
      return updated;
    });
  }

  function changeViewMode(mode: SearchViewMode) {
    setViewMode(mode);
    localStorage.setItem("krona-search-view", mode);
  }

  function clearFilters() {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    router.replace(`/search${params.size ? `?${params.toString()}` : ""}`);
    location.disableLocation();
  }

  // Copia la URL completa para conservar la búsqueda, distancia y filtros elegidos.
  async function copySearchLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 1800);
    } catch {
      setLinkCopied(false);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <LocationFilter
          status={location.status}
          radiusMeters={location.radiusMeters}
          onRadiusChange={(meters) => {
            location.setRadiusMeters(meters);
            updateUrl("radius", String(meters));
          }}
          onRequestLocation={location.requestLocation}
          onDisableLocation={location.disableLocation}
        />

        {!hasQuery && (
          <SearchHistory
            items={history}
            onSelect={(value) =>
              router.push(`/search?q=${encodeURIComponent(value)}`)
            }
            onClear={() => {
              localStorage.removeItem("krona-search-history");
              setHistory([]);
            }}
          />
        )}

        <SearchFilters
          activeFilter={activeFilter}
          onFilterChange={(value) => updateUrl("type", value)}
          counts={counts}
        />
        <SearchQuickFilters
          active={quickFilters}
          onToggle={toggleQuickFilter}
        />
        <SearchResultsToolbar
          query={query}
          total={refinedResults.length}
          activeFilterCount={activeFilterCount}
          filtersOpen={filtersOpen}
          viewMode={viewMode}
          linkCopied={linkCopied}
          onToggleFilters={() => setFiltersOpen((current) => !current)}
          onViewModeChange={changeViewMode}
          onCopyLink={copySearchLink}
          onClearFilters={clearFilters}
        />

        {filtersOpen && (
          <SearchAdvancedFilters
            categories={categories}
            category={category}
            sort={sort}
            verifiedOnly={verifiedOnly}
            minimumRating={minimumRating}
            onCategoryChange={(value) => updateUrl("category", value)}
            onSortChange={(value) => updateUrl("sort", value)}
            onVerifiedChange={(value) => updateUrl("verified", String(value))}
            onRatingChange={(value) => updateUrl("rating", String(value))}
          />
        )}

        {hasQuery && isLoading ? (
          <SearchSkeleton />
        ) : (
          <>
            <SearchResults
              results={refinedResults}
              viewMode={viewMode}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
              onPreviewBusiness={setPreviewBusiness}
            />
          </>
        )}
      </main>
      <BusinessPreview
        business={previewBusiness}
        favorite={
          previewBusiness ? favoriteIds.includes(previewBusiness.id) : false
        }
        onClose={() => setPreviewBusiness(null)}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
