"use client";

import { BadgeCheck, Heart, MapPin, Star } from "lucide-react";
import styles from "./SearchQuickFilters.module.css";

export type QuickFilter = "nearby" | "rated" | "verified" | "favorites";

interface Props {
  active: QuickFilter[];
  onToggle: (filter: QuickFilter) => void;
}

const FILTERS = [
  { id: "nearby", label: "A menos de 1 km", icon: MapPin },
  { id: "rated", label: "4,5+ estrellas", icon: Star },
  { id: "verified", label: "Verificados", icon: BadgeCheck },
  { id: "favorites", label: "Mis favoritos", icon: Heart },
] as const;

export function SearchQuickFilters({ active, onToggle }: Props) {
  return (
    <div className={styles.filters} aria-label="Filtros rápidos">
      <span>Accesos rápidos</span>
      {FILTERS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          className={active.includes(id) ? styles.active : ""}
          aria-pressed={active.includes(id)}
          onClick={() => onToggle(id)}
        >
          <Icon size={13} /> {label}
        </button>
      ))}
    </div>
  );
}
