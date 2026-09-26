import Link from "next/link";
import styles from "./PromoBanner.module.css";

export const PromoBanner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.text}>
        <h3>Promociona tu negocio</h3>
        <p>Llega a más clientes y destaca tus servicios.</p>
        <Link href="/planes" className={styles.btn}>
          Quiero más clientes
        </Link>
      </div>
      <span className={styles.icon}>🚀</span>
    </div>
  );
};