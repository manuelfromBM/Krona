import styles from "./Statistics.module.css";
import type { StatisticsData } from "../../../types/statistics.types";

interface Props {
  data: StatisticsData;
}

export const Statistics = ({ data }: Props) => {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Estadísticas</h3>
        <span className={styles.period}>Este mes</span>
      </div>

      <div className={styles.grid}>
        <div className={styles.metric}>
          <strong>{data.reservations}</strong>
          <span>Reservas</span>
        </div>

        <div className={styles.metric}>
          <strong>{data.income}</strong>
          <span>Ingresos</span>
        </div>

        <div className={styles.metric}>
          <strong>{data.clients}</strong>
          <span>Clientes</span>
        </div>

        <div className={styles.metric}>
          <strong>{data.rating}</strong>
          <span>Calificación</span>
        </div>
      </div>
    </section>
  );
};