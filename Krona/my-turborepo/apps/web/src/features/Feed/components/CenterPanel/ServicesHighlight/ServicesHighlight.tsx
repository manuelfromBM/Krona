import Image from "next/image";
import styles from "./ServicesHighlight.module.css";
import type { ServiceItem } from "../../../types/centerPanel.types";

interface Props { services: ServiceItem[]; }

export const ServicesHighlight = ({ services }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>Servicios destacados</span>
        <button className={styles.link}>Ver todos</button>
      </div>

      <ul className={styles.list}>
        {services.map(s => (
          <li key={s.id} className={styles.item}>
            <div className={styles.img}>
              {s.image
                ? <Image src={s.image} alt={s.name} fill style={{ objectFit:"cover" }} />
                : <span>{s.emoji}</span>
              }
            </div>
            <div className={styles.info}>
              <p className={styles.name}>{s.name}</p>
              <p className={styles.desc}>{s.description}</p>
              <div className={styles.bottom}>
                <span className={styles.price}>{s.price}</span>
                <span className={styles.rating}>
                  <span className={styles.star}>★</span>
                  {s.rating} ({s.reviews})
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};