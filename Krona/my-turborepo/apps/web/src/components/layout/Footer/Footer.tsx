import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                <div className={styles.top}>
                    <div className={styles.brand}>
                        <h2>Krona</h2>
                        <p>
                            Plataforma para descubrir, agendar y gestionar servicios locales.
                        </p>
                    </div>

                    <div className={styles.columns}>
                        <div>
                            <h4>Producto</h4>
                            <ul>
                                <li>Funciones</li>
                                <li>Precios</li>
                                <li>Roadmap</li>
                            </ul>
                        </div>

                        <div>
                            <h4>Empresa</h4>
                            <ul>
                                <li>Sobre nosotros</li>
                                <li>Contacto</li>
                            </ul>
                        </div>

                        <div>
                            <h4>Legal</h4>
                            <ul>
                                <li>Términos</li>
                                <li>Privacidad</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© {new Date().getFullYear()} Krona. Todos los derechos reservados.</p>
                </div>

            </div>
        </footer>
    )
}