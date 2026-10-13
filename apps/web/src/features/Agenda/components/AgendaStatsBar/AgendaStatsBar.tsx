import type { LucideIcon } from "lucide-react";
import styles from "./AgendaStatsBar.module.css";

export interface AgendaStatTile {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: "teal" | "amber" | "slate";
}

export function AgendaStatsBar({ tiles }: { tiles: AgendaStatTile[] }) {
  return (
    <div className={styles.bar}>
      {tiles.map((tile) => {
        const Icon = tile.icon;
        return (
          <div key={tile.label} className={styles.tile}>
            <span className={`${styles.iconWrap} ${styles[tile.tone ?? "slate"]}`}>
              <Icon size={16} />
            </span>
            <div className={styles.text}>
              <strong>{tile.value}</strong>
              <span>{tile.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
