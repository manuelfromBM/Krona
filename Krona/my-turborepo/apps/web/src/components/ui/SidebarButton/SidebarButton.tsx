import Link from "next/link";
import styles from "./SidebarButton.module.css";

interface SidebarButtonProps {
    icon: React.ReactNode;
    label: string;
    href: string;
    variant?: "default" | "crear";
}

export default function SidebarButton({ icon, label, href, variant = "default" }: SidebarButtonProps) {
    return (
        <Link href={href} className={`${styles.button} ${variant === "crear" ? styles.crear : ""}`}>
            <span className={styles.icon}>
                {icon}
            </span>

            <span>{label}</span>
        </Link>
    );
}

