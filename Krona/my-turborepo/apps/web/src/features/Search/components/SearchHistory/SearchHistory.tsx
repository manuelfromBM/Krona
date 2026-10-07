"use client";

import { Clock3, X } from "lucide-react";
import styles from "./SearchHistory.module.css";

interface Props {
  items: string[];
  onSelect: (query: string) => void;
  onClear: () => void;
}

export function SearchHistory({ items, onSelect, onClear }: Props) {
  if (!items.length) return null;
  return (
    <section className={styles.history}>
      <div>
        <Clock3 size={15} />
        <strong>Búsquedas recientes</strong>
      </div>
      <div className={styles.items}>
        {items.map((item) => (
          <button key={item} type="button" onClick={() => onSelect(item)}>
            {item}
          </button>
        ))}
      </div>
      <button type="button" className={styles.clear} onClick={onClear}>
        <X size={14} /> Limpiar
      </button>
    </section>
  );
}
