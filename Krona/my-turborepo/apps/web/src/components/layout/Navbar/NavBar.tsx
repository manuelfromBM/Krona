"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams, } from "next/navigation";
import { Search, MapPin, ChevronDown, X, } from "lucide-react";
import styles from "./Nabvar.module.css";
import { NotificationBell } from "./Notifications/NotificationBell";
import { useMemo, useState } from "react";
import { SearchDropdown } from "../../../features/Search/components/SearchDropdown/SearchDropdown";
import { mockBusinesses, mockSuggestedUsers, } from "../../../features/Search/mocks/mockSearch";
import type { SearchResult } from "../../../features/Search/types/search.types";

export const Navbar = () => {
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
              .toUpperCase()
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

  const handleClearSearch = () =>{
    router.replace("/search");
  };

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

  // Cuando estamos en el Feed y pulsamos el buscador,
  // entramos a la pantalla de búsqueda.
  const handleOpenSearch = () => {
    if (!isSearchPage) {
      router.push("/search");
    }
  };

  // Cuando escribimos dentro de /search,
  // actualizamos la URL.
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    // Si queda vacío, dejamos simplemente /search.
    if (!value.trim()) {
      router.replace("/search");
      return;
    }

    // encodeURIComponent evita problemas con espacios
    // o caracteres especiales.
    router.replace(
      `/search?q=${encodeURIComponent(value)}`
    );
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
            onChange={(event) =>
              setSearchValue(event.target.value)
            }
          />
        </div>
          
          
        <SearchDropdown
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
        />

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