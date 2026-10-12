"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Play,
  Search,
  Star,
  Store,
} from "lucide-react";

import styles from "./SearchResults.module.css";
import type {
  SearchBusiness,
  SearchResult,
  SearchUser,
  SearchVideo,
} from "../../types/search.types";
import type { SearchViewMode } from "../SearchResultsToolbar/SearchResultsToolbar";

interface SearchResultsProps {
  results: SearchResult[];
  viewMode?: SearchViewMode;
  favoriteIds?: string[];
  onToggleFavorite?: (id: string) => void;
  onPreviewBusiness?: (business: SearchBusiness) => void;
}

interface SectionHeaderProps {
  title: string;
  count: number;
  plural?: string;
  expanded: boolean;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  hasOverflow: boolean;
  onSlide: (direction: -1 | 1) => void;
  onToggleExpanded: () => void;
}

function useCarouselControls(itemCount: number) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
    hasOverflow: false,
  });
  const updateState = useCallback(() => {
    const element = carouselRef.current;
    if (!element) return;
    const hasOverflow = element.scrollWidth > element.clientWidth + 2;
    setState({
      hasOverflow,
      canScrollLeft: element.scrollLeft > 2,
      canScrollRight:
        hasOverflow &&
        element.scrollLeft + element.clientWidth < element.scrollWidth - 2,
    });
  }, []);
  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;
    updateState();
    element.addEventListener("scroll", updateState, { passive: true });
    const observer = new ResizeObserver(updateState);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", updateState);
      observer.disconnect();
    };
  }, [itemCount, updateState]);
  const slide = (direction: -1 | 1) =>
    carouselRef.current?.scrollBy({
      left: direction * Math.max(280, carouselRef.current.clientWidth * 0.78),
      behavior: "smooth",
    });
  return { carouselRef, slide, ...state };
}

function handleCarouselKeys(
  event: React.KeyboardEvent<HTMLDivElement>,
  slide: (direction: -1 | 1) => void,
) {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    slide(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    slide(1);
  }
}

function SectionHeader({
  title,
  count,
  plural = "todos",
  expanded,
  canScrollLeft,
  canScrollRight,
  hasOverflow,
  onSlide,
  onToggleExpanded,
}: SectionHeaderProps) {
  return (
    <header className={styles.sectionHeader}>
      <div>
        <span>Búsqueda</span>
        <h2>
          {title} <small>({count})</small>
        </h2>
      </div>
      <div className={styles.headerActions}>
        {!expanded && hasOverflow && (
          <div className={styles.carouselButtons}>
            <button
              type="button"
              disabled={!canScrollLeft}
              onClick={() => onSlide(-1)}
              aria-label={`Ver ${title} anteriores`}
            >
              <ChevronLeft size={16} />
              <span>Anterior</span>
            </button>
            <button
              type="button"
              disabled={!canScrollRight}
              onClick={() => onSlide(1)}
              aria-label={`Ver más ${title}`}
            >
              <span>Siguiente</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
        <button
          type="button"
          className={styles.viewAllButton}
          onClick={onToggleExpanded}
        >
          {expanded ? "Ver menos" : `Ver ${plural}`}{" "}
          <span aria-hidden="true">{expanded ? "↑" : "→"}</span>
        </button>
      </div>
    </header>
  );
}

function UsersSection({ users }: { users: SearchUser[] }) {
  const carousel = useCarouselControls(users.length);
  const [expanded, setExpanded] = useState(false);
  if (!users.length) return null;
  return (
    <section className={styles.section}>
      <SectionHeader
        title="Usuarios"
        count={users.length}
        expanded={expanded}
        canScrollLeft={carousel.canScrollLeft}
        canScrollRight={carousel.canScrollRight}
        hasOverflow={carousel.hasOverflow}
        onSlide={carousel.slide}
        onToggleExpanded={() => setExpanded((value) => !value)}
      />
      <div
        ref={carousel.carouselRef}
        tabIndex={expanded ? -1 : 0}
        onKeyDown={(event) => handleCarouselKeys(event, carousel.slide)}
        aria-label="Carrusel de usuarios. Usa las flechas izquierda y derecha para navegar."
        className={`${styles.usersGrid} ${styles.carousel} ${expanded ? styles.expanded : ""}`}
      >
        {users.map((user) => (
          <article key={user.id} className={styles.userCard}>
            <div className={styles.avatar}>
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.username}
                  fill
                  sizes="58px"
                  className={styles.image}
                />
              ) : (
                <span>{user.username.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className={styles.userInfo}>
              <div className={styles.nameRow}>
                <strong>{user.fullName}</strong>
                {user.verified && (
                  <BadgeCheck size={14} className={styles.verified} />
                )}
              </div>
              <span>@{user.username}</span>
              <small>{user.followers ?? 0} seguidores</small>
            </div>
            <button type="button" className={styles.actionButton}>
              Ver perfil
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function BusinessesSection({
  businesses,
  favoriteIds,
  onToggleFavorite,
  onPreviewBusiness,
}: {
  businesses: SearchBusiness[];
  favoriteIds: string[];
  onToggleFavorite?: (id: string) => void;
  onPreviewBusiness?: (business: SearchBusiness) => void;
}) {
  const carousel = useCarouselControls(businesses.length);
  const [expanded, setExpanded] = useState(false);
  if (!businesses.length) return null;
  return (
    <section className={styles.section}>
      <SectionHeader
        title="Pymes"
        count={businesses.length}
        plural="todas"
        expanded={expanded}
        canScrollLeft={carousel.canScrollLeft}
        canScrollRight={carousel.canScrollRight}
        hasOverflow={carousel.hasOverflow}
        onSlide={carousel.slide}
        onToggleExpanded={() => setExpanded((value) => !value)}
      />
      <div
        ref={carousel.carouselRef}
        tabIndex={expanded ? -1 : 0}
        onKeyDown={(event) => handleCarouselKeys(event, carousel.slide)}
        aria-label="Carrusel de pymes. Usa las flechas izquierda y derecha para navegar."
        className={`${styles.businessGrid} ${styles.carousel} ${expanded ? styles.expanded : ""}`}
      >
        {businesses.map((business) => (
          <article key={business.id} className={styles.businessCard}>
            <div className={styles.businessImage}>
              {business.image ? (
                <Image
                  src={business.image}
                  alt={business.name}
                  fill
                  sizes="220px"
                  className={styles.image}
                />
              ) : (
                <Store size={25} />
              )}
              <button
                type="button"
                className={`${styles.favoriteButton} ${favoriteIds.includes(business.id) ? styles.favorite : ""}`}
                onClick={() => onToggleFavorite?.(business.id)}
                aria-label={
                  favoriteIds.includes(business.id)
                    ? "Quitar de favoritos"
                    : "Guardar en favoritos"
                }
              >
                <Heart
                  size={15}
                  fill={
                    favoriteIds.includes(business.id) ? "currentColor" : "none"
                  }
                />
              </button>
            </div>
            <div className={styles.businessBody}>
              <div className={styles.nameRow}>
                <strong>{business.name}</strong>
                {business.verified && (
                  <BadgeCheck size={14} className={styles.verified} />
                )}
              </div>
              <span>{business.category}</span>
              <div className={styles.businessMeta}>
                {business.rating !== undefined && (
                  <span>
                    <Star size={12} fill="currentColor" />
                    {business.rating}
                  </span>
                )}
                {business.distance && (
                  <span>
                    <MapPin size={12} />
                    {business.distance}
                  </span>
                )}
              </div>
              <button
                type="button"
                className={styles.actionButton}
                onClick={() => onPreviewBusiness?.(business)}
              >
                Vista rápida
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function VideosSection({ videos }: { videos: SearchVideo[] }) {
  const carousel = useCarouselControls(videos.length);
  const [expanded, setExpanded] = useState(false);
  if (!videos.length) return null;
  return (
    <section className={styles.section}>
      <SectionHeader
        title="Videos"
        count={videos.length}
        expanded={expanded}
        canScrollLeft={carousel.canScrollLeft}
        canScrollRight={carousel.canScrollRight}
        hasOverflow={carousel.hasOverflow}
        onSlide={carousel.slide}
        onToggleExpanded={() => setExpanded((value) => !value)}
      />
      <div
        ref={carousel.carouselRef}
        tabIndex={expanded ? -1 : 0}
        onKeyDown={(event) => handleCarouselKeys(event, carousel.slide)}
        aria-label="Carrusel de videos. Usa las flechas izquierda y derecha para navegar."
        className={`${styles.videoGrid} ${styles.carousel} ${expanded ? styles.expanded : ""}`}
      >
        {videos.map((video) => (
          <article key={video.id} className={styles.videoCard}>
            <div className={styles.videoThumbnail}>
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                sizes="260px"
                className={styles.image}
              />
              <span className={styles.playIcon}>
                <Play size={20} fill="currentColor" />
              </span>
              <span className={styles.views}>{video.views ?? 0} vistas</span>
            </div>
            <strong>{video.title}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SearchResults({
  results,
  viewMode = "grid",
  favoriteIds = [],
  onToggleFavorite,
  onPreviewBusiness,
}: SearchResultsProps) {
  if (!results.length)
    return (
      <section className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <Search size={24} />
        </div>
        <h3>No encontramos resultados</h3>
        <p>Prueba con otro nombre, negocio, servicio o amplía la distancia.</p>
      </section>
    );
  const users = results.filter(
    (result): result is SearchUser => result.type === "user",
  );
  const businesses = results.filter(
    (result): result is SearchBusiness => result.type === "business",
  );
  const videos = results.filter(
    (result): result is SearchVideo => result.type === "video",
  );
  return (
    <div
      className={`${styles.results} ${viewMode === "list" ? styles.listMode : ""}`}
    >
      <UsersSection users={users} />
      <BusinessesSection
        businesses={businesses}
        favoriteIds={favoriteIds}
        onToggleFavorite={onToggleFavorite}
        onPreviewBusiness={onPreviewBusiness}
      />
      <VideosSection videos={videos} />
    </div>
  );
}
