"use client";

import { SlidersHorizontal } from "lucide-react";
import styles from "./SearchAdvancedFilters.module.css";

interface Props {
  categories: string[];
  category: string;
  sort: string;
  verifiedOnly: boolean;
  minimumRating: number;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onVerifiedChange: (value: boolean) => void;
  onRatingChange: (value: number) => void;
}

export function SearchAdvancedFilters(props: Props) {
  return (
    <section className={styles.toolbar} aria-label="Filtros avanzados">
      <div className={styles.title}>
        <SlidersHorizontal size={16} />
        <strong>Filtrar y ordenar</strong>
      </div>
      <label>
        Categoría
        <select
          value={props.category}
          onChange={(event) => props.onCategoryChange(event.target.value)}
        >
          <option value="">Todas</option>
          {props.categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        Calificación
        <select
          value={props.minimumRating}
          onChange={(event) => props.onRatingChange(Number(event.target.value))}
        >
          <option value={0}>Todas</option>
          <option value={4}>4+ estrellas</option>
          <option value={4.5}>4,5+ estrellas</option>
        </select>
      </label>
      <label>
        Ordenar
        <select
          value={props.sort}
          onChange={(event) => props.onSortChange(event.target.value)}
        >
          <option value="relevance">Recomendados</option>
          <option value="distance">Más cercanos</option>
          <option value="rating">Mejor valoración</option>
          <option value="popular">Más populares</option>
        </select>
      </label>
      <label className={styles.check}>
        <input
          type="checkbox"
          checked={props.verifiedOnly}
          onChange={(event) => props.onVerifiedChange(event.target.checked)}
        />{" "}
        Solo verificados
      </label>
    </section>
  );
}
