import styles from "./NearOpportunities.module.css";
import type { Opportunity } from "../../../types/centerPanel.types";

interface Props { opportunities: Opportunity[]; }

const STATUS_CONFIG = {
  disponible: { label: "Disponible", cls: "green"  },
  promocion:  { label: "Promoción",  cls: "orange" },
  cerrado:    { label: "Cerrado",    cls: "red"    },
};

export const NearOpportunities = ({ opportunities }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>Oportunidades cerca de ti</span>
        <button className={styles.link}>Ver más</button>
      </div>

      <ul className={styles.list}>
        {opportunities.map(o => {
          const status = STATUS_CONFIG[o.status];
          return (
            <li key={o.id} className={styles.item}>
              <div className={styles.img}>{o.emoji}</div>
              <div className={styles.info}>
                <p className={styles.name}>{o.name}</p>
                <p className={styles.dist}>{o.distance}</p>
              </div>
              <span className={`${styles.badge} ${styles[status.cls]}`}>
                {status.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};