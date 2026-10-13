import type { AgendaTabKey } from "../../types/agenda.types";
import styles from "./AgendaFilters.module.css";

const TABS: { key: AgendaTabKey; label: string }[] = [
  { key: "proximas", label: "Próximas" },
  { key: "pendientes", label: "Pendientes" },
  { key: "pasadas", label: "Pasadas" },
  { key: "canceladas", label: "Canceladas" },
];

interface AgendaFiltersProps {
  active: AgendaTabKey;
  counts: Record<AgendaTabKey, number>;
  onChange: (tab: AgendaTabKey) => void;
}

export function AgendaFilters({ active, counts, onChange }: AgendaFiltersProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Filtrar citas">
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={active === key}
          className={`${styles.tab} ${active === key ? styles.active : ""}`}
          onClick={() => onChange(key)}
        >
          {label}
          <span className={styles.count}>{counts[key]}</span>
        </button>
      ))}
    </div>
  );
}
