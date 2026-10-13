import Link from "next/link";
import { Sparkles } from "lucide-react";
import styles from "./AgendaPromoCard.module.css";

interface AgendaPromoCardProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export function AgendaPromoCard({
  title,
  description,
  ctaLabel,
  ctaHref,
}: AgendaPromoCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>
        <Sparkles size={16} />
      </span>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>{description}</p>
      <Link href={ctaHref} className={styles.cta}>
        {ctaLabel}
      </Link>
    </div>
  );
}
