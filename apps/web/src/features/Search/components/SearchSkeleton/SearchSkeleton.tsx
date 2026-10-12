import styles from "./SearchSkeleton.module.css";

export function SearchSkeleton() {
  return (
    <div
      className={styles.skeleton}
      role="status"
      aria-label="Buscando resultados"
    >
      {[0, 1, 2].map((section) => (
        <section key={section} className={styles.section}>
          <div className={styles.title} />
          <div className={styles.grid}>
            {[0, 1, 2, 3].map((card) => (
              <div key={card} className={styles.card}>
                <div className={styles.image} />
                <div className={styles.line} />
                <div className={styles.shortLine} />
              </div>
            ))}
          </div>
        </section>
      ))}
      <span className={styles.srOnly}>Buscando resultados...</span>
    </div>
  );
}
