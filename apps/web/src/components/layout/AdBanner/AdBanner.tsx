import Link from "next/link";
import styles from "./AdBanner.module.css";
import type { AdBanner as AdBannerType } from "../../../features/Feed/types/suggestion.types";

export const AdBanner = ({ ad }: { ad: AdBannerType}) => {
    return (
        <div className={styles.card}>
            <div className={styles.img}>
                <span>{ad.emoji}</span>
            </div>
            <div className={styles.body}>
                <p className={styles.label}>{ad.sponsor}</p>
                <p className={styles.title}>{ad.title}</p>
                <p  className={styles.desc}>{ad.description}</p>
                <Link href={ad.ctaHref} className={styles.cta}>{ad.ctaLabel}</Link>
            </div>
        </div>
    );
};