"use client";

import { Check, Grid2X2, Link2, List, SlidersHorizontal } from "lucide-react";

import styles from "./SearchResultsToolbar.module.css";

export type SearchViewMode = "grid" | "list";

interface SearchResultsToolbarProps {
  query: string;
  total: number;
  activeFilterCount: number;
  filtersOpen: boolean;
  viewMode: SearchViewMode;
  linkCopied: boolean;
  onToggleFilters: () => void;
  onViewModeChange: (mode: SearchViewMode) => void;
  onCopyLink: () => void;
  onClearFilters: () => void;
}

export function SearchResultsToolbar(props: SearchResultsToolbarProps) {
  return (
    <section className={styles.toolbar} aria-label="Controles de resultados">
      <div className={styles.summary}>
        <strong>
          {props.query
            ? `Resultados para “${props.query}”`
            : "Explora servicios cerca de ti"}
        </strong>
        <span>
          {props.total}{" "}
          {props.total === 1
            ? "resultado encontrado"
            : "resultados encontrados"}
        </span>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.filterButton} ${props.filtersOpen ? styles.active : ""}`}
          aria-expanded={props.filtersOpen}
          onClick={props.onToggleFilters}
        >
          <SlidersHorizontal size={15} />
          Filtros
          {props.activeFilterCount > 0 && (
            <span className={styles.badge}>{props.activeFilterCount}</span>
          )}
        </button>

        {props.activeFilterCount > 0 && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={props.onClearFilters}
          >
            Limpiar
          </button>
        )}

        <div className={styles.viewToggle} aria-label="Vista de resultados">
          <button
            type="button"
            className={props.viewMode === "grid" ? styles.selected : ""}
            aria-label="Vista en cuadrícula"
            aria-pressed={props.viewMode === "grid"}
            onClick={() => props.onViewModeChange("grid")}
          >
            <Grid2X2 size={15} />
          </button>
          <button
            type="button"
            className={props.viewMode === "list" ? styles.selected : ""}
            aria-label="Vista en lista"
            aria-pressed={props.viewMode === "list"}
            onClick={() => props.onViewModeChange("list")}
          >
            <List size={16} />
          </button>
        </div>

        <button
          type="button"
          className={styles.shareButton}
          onClick={props.onCopyLink}
        >
          {props.linkCopied ? <Check size={15} /> : <Link2 size={15} />}
          <span>{props.linkCopied ? "Copiado" : "Compartir"}</span>
        </button>
      </div>
    </section>
  );
}
