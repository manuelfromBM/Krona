"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, ChevronDown, X } from "lucide-react";
import styles from "./Nabvar.module.css";
import { NotificationBell } from "./Notifications/NotificationBell";
import { useEffect, useMemo, useState } from "react";
import { SearchDropdown } from "../../../features/Search/components/SearchDropdown/SearchDropdown";
import { mockBusinesses, mockSuggestedUsers } from "../../../features/Search/mocks/mockSearch";
import type { SearchResult } from "../../../features/Search/types/search.types";

export const Navbar = () => {
  // Al momento que el cliente hace enter lo lleva Search
  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    const value = searchValue.trim();

    if (!value) {
      return;
    }

    router.push(
       `/search?q=${encodeURIComponent(value)}`
    );
  };

  // Estado del buscador rapido
  const [ searchValue, setSearchValue ] = useState ("");
  const quickResults = useMemo<SearchResult[]>(() => {
    const value = searchValue
      .trim()
      .toLowerCase();

      if (!value) {
        return [];
      }

      const allAccounts: SearchResult[] =[
        ...mockSuggestedUsers,
        ...mockBusinesses,
      ];

      return allAccounts.filter((item) => {
        if (item.type === "user") {
          return (
            item.username
              .toLowerCase()
              .includes(value) || item.fullName
                .toLowerCase()
                .includes(value)
          );
        }

        if (item.type === "business") {
          const matchesName = item.name
            .toLowerCase()
            .includes(value);

          const matchesCategory = item.category
            .toLowerCase()
            .includes(value);
          
          const matchesKeyword = item.keywords.some(
            (keyword) => 
              keyword
                .toLowerCase()
                .includes(value)
          );

          return (
            matchesName || matchesCategory || matchesKeyword
          );
        }

        return false;
      });
  }, [searchValue]);

  const router = useRouter();

  // Nos permite saber en qué ruta estamos.
  const pathname = usePathname();

  // Nos permite leer:
  // /search?q=meca
  const searchParams = useSearchParams();

  // Saber si estamos dentro de la pantalla Search.
  const isSearchPage = pathname === "/search";

  // Obtenemos lo que está escrito en ?q=
  const query = searchParams.get("q") ?? "";

  // En /search el input siempre refleja lo que existe en la URL.
  useEffect(() => {
    if (isSearchPage) setSearchValue(query);
  }, [isSearchPage, query]);

  // Evita actualizar la URL en cada pulsación: espera 300 ms.
  useEffect(() => {
    if (!isSearchPage || searchValue === query) return;
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchValue.trim()) params.set("q", searchValue.trim());
      else params.delete("q");
      router.replace(`/search${params.size ? `?${params.toString()}` : ""}`);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [isSearchPage, query, router, searchParams, searchValue]);

  const handleClearSearch = () => {
    setSearchValue("");
    if (isSearchPage) router.replace("/search");
  };

  // Cuando escribimos dentro de /search,
  // actualizamos la URL.
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchValue(value);

    // En /search la URL se actualiza mediante el debounce superior.
  };

  return (
    <div className={styles.navbar}>

      {/* BUSCADOR */}
      <div className={styles.searchWrapper}>

        <div className={styles.search}>
          <Search
            size={18}
            className={styles.searchIcon}
          />

          <input
            type="text"
            placeholder="Buscar servicios o negocios"
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
          {searchValue && (
            <button type="button" className={styles.clearSearch} onClick={handleClearSearch} aria-label="Limpiar búsqueda">
              <X size={16} />
            </button>
          )}
        </div>
          
          
        {!isSearchPage && <SearchDropdown
          query={searchValue}
          results={quickResults}
          onViewMore={() => {
            router.push(
              `/search?q=${encodeURIComponent(
                searchValue
              )}`
            );
          }}
          onSelectResult={(result) => {
            /*
              Por ahora abrimos la búsqueda completa.
          
              Más adelante, cuando tengamos
              páginas de perfil / negocios,
              podremos hacer:
          
              router.push(`/profile/${result.id}`)
            */
          
            if (result.type === "user") {
              router.push(
                `/search?q=${encodeURIComponent(
                  result.username
                )}`
              );
            }
          
            if (result.type === "business") {
              router.push(
                `/search?q=${encodeURIComponent(
                  result.name
                )}`
              );
            }
          }}
        />}

      </div>

      {/* ACCIONES DERECHA */}
      <div className={styles.actions}>
        <button
          className={styles.location}
          type="button"
        >
          <MapPin size={17} />

          <span>
            Santiago, Chile
          </span>
        </button>

        <NotificationBell />

        <button
          className={styles.profile}
          type="button"
        >
          <div className={styles.avatar}>
            <Image
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
              alt="Perfil"
              fill
              sizes="38px"
              style={{
                objectFit: "cover",
              }}
            />
          </div>

          <ChevronDown size={15} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
