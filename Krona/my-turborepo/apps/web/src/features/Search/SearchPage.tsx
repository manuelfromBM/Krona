"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import styles from "./SearchPage.module.css";

import { SearchSuggestions } from "./components/SearchSuggestions/SearchSuggestions";
import { ExploreGrid } from "./components/ExploreGrid/ExploreGrid";
import { SearchResults } from "./components/SearchResults/SearchResults";

import {
  SearchFilters,
  type SearchFilter,
} from "./components/SearchFilters/SearchFilters";

import { useSearch } from "./hooks/useSearch";

export default function SearchPage() {
  /*
    ==========================
    FILTRO ACTIVO
    ==========================

    Por defecto mostramos todo.
  */
  const [activeFilter, setActiveFilter] =
    useState<SearchFilter>("all");


  /*
    ==========================
    LEER BÚSQUEDA DESDE LA URL
    ==========================

    Ejemplo:

    /search?q=mecanico

    query = "mecanico"
  */
  const searchParams = useSearchParams();

  const query =
    searchParams.get("q") ?? "";


  /*
    ==========================
    HOOK DE BÚSQUEDA
    ==========================
  */
  const {
    isLoading,
    results,
    hasQuery,
    suggestedUsers,
    exploreVideos,
  } = useSearch();


  /*
    ==========================
    CONTADORES DE FILTROS
    ==========================

    Esto nos permitirá mostrar:

    Todos 5
    Usuarios 1
    Pymes 3
    Videos 1
  */
  const counts = {
    all: results.length,

    user: results.filter(
      (result) =>
        result.type === "user"
    ).length,

    business: results.filter(
      (result) =>
        result.type === "business"
    ).length,

    video: results.filter(
      (result) =>
        result.type === "video"
    ).length,
  };


  /*
    ==========================
    RESULTADOS FILTRADOS
    ==========================

    Si está seleccionado "all",
    mostramos todos.

    Si no, solamente mostramos
    el tipo seleccionado.
  */
  const filteredResults =
    activeFilter === "all"
      ? results
      : results.filter(
          (result) =>
            result.type === activeFilter
        );


  return (
    <div className={styles.page}>

      <main className={styles.content}>

        {/*
          ==========================
          SIN BÚSQUEDA
          ==========================

          Mostramos sugerencias
          y contenido para explorar.
        */}
        {!hasQuery && (
          <>
            <SearchSuggestions
              users={suggestedUsers}
            />

            <ExploreGrid
              videos={exploreVideos}
            />
          </>
        )}


        {/*
          ==========================
          CARGANDO
          ==========================
        */}
        {hasQuery && isLoading && (
          <div className={styles.loading}>
            <div
              className={styles.spinner}
            />

            <p>
              Buscando resultados...
            </p>
          </div>
        )}


        {/*
          ==========================
          RESULTADOS + FILTROS
          ==========================
        */}
        {hasQuery && !isLoading && (
          <>
            <SearchFilters
              activeFilter={activeFilter}
              onFilterChange={
                setActiveFilter
              }
              counts={counts}
            />

            <SearchResults
              results={filteredResults}
            />
          </>
        )}

      </main>
    </div>
  );
}