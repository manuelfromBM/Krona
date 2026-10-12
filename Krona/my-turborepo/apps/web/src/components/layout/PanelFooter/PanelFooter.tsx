import { link } from "fs";
import styles from "./PanelFooter.module.css";

const links = [
    "Informacion", 
    "Ayuda", 
    "Privacidad",
    "Condiciones",
    "Ubicaciones",
    "Idioma",
];

export const PanelFooter = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                {links.map( link => 
                    <a key={link} href="#" className={styles.link}>{link}</a>
                )}
            </div>
            <p className={styles.copy}>© 2026 KRONA</p>
        </footer>
    );
};