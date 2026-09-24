"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./Suggestions.module.css";
import type { Suggestion} from "../../../features/Feed/types/suggestion.types";

interface SuggestionsProps {
    suggestions: Suggestion[];
}

export const Suggestions = ({ suggestions }: SuggestionsProps) => {
    const [ following, setFollowing] = useState<Set<string>>(new Set());

    function toggle(id: string) {
        setFollowing(prev => {
            const next = new Set(prev);

            next.has(id) 
                ?next.delete(id) 
                : next.add(id);

            return next;
        });
    }

    return (
        <div>
            
            <div className={styles.header}>
                <span className={styles.title}>Sugerencias para ti</span>
                <button className={styles.viewAll}>Ver todos</button>
            </div>

            <ul className={styles.list}>
                {suggestions.map(s => (
                    <li key={s.id} className={styles.item}>
                        <div className={styles.avatar}>
                            {s.avatar
                                ? <Image src={s.avatar} alt={s.username} fill style={{ objectFit: "cover" }}></Image>
                                : <span>{s.initials}</span>
                            }
                        </div>

                        <div className={styles.info}>
                            <p className={styles.username}>{s.username}</p>
                            <p className={styles.mutual}>{s.mutualinfo}</p>
                        </div>
                        <button
                            className={'${styles.followBtn} ${following.has(s.id) ? styles.following : ""}'}
                            onClick={() => toggle(s.id)}
                        >
                            {following.has(s.id) ? "Siguendo" : "Seguir"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};