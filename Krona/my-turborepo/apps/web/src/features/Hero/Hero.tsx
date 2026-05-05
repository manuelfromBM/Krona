import styles from './Hero.module.css'

export default function SeccionHero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>

                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Gestiona y reserva servicios en un solo lugar
                    </h1>

                    <p className={styles.subtitle}>
                        Krona conecta clientes con profesionales y empresas,
                        permitiendo descubrir, agendar y pagar servicios de forma simple y centralizada.
                    </p>

                    <div className={styles.buttons}>
                        <button className={styles.primaryBtn}>
                            Explorar servicios
                        </button>

                        <button className={styles.secondaryBtn}>
                            Soy prestador
                        </button>
                    </div>
                </div>

                <div className={styles.visual}>
                    {/* Placeholder simple (luego pueden meter imagen o mockup) */}
                    <div className={styles.mockup}>
                        <span>Vista previa app</span>
                    </div>
                </div>

            </div>
        </section>
    )
}