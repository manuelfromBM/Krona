import Link from "next/link";
import styles from "./SidebarButton.module.css";

interface SidebarButtonProps {
    icon: React.ReactNode;
    label: string;
    href: string;
    badge?: number;
    variant?: "default" | "crear";
}

export default function SidebarButton({ icon, label, href, badge, variant = "default" }: SidebarButtonProps) {
    return (
        <Link href={href} className={`${styles.button} ${variant === "crear" ? styles.crear : ""}`}>
            <span className={styles.icon}>{icon}</span>
            <span className={styles.label}>{label}</span>
            {badge && <span className={styles.badge}>{badge}</span>}
        </Link>
    );
}