import styles from './NavBar.module.css'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>

                <div className={styles.logo}>
                    Krona
                </div>

                <ul className={styles.links}>
                    <li>Servicios</li>
                    <li>Cómo funciona</li>
                    <li>Precios</li>
                </ul>

                <div className={styles.actions}>
                    <button className={styles.login}>Ingresar</button>
                    <button className={styles.signup}>Comenzar</button>
                </div>

            </div>
        </nav>
    )
}