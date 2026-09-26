"use client";

import Image from "next/image";
import { CheckCircle2, Section } from "lucide-react";
import styles from "./SearchSuggestions.module.css";
import type { SearchUser } from "../../types/search.types";

interface SearchSuggestionsProps {
    users: SearchUser[];
}

export const SearchSuggestions = ({
    users,
}: SearchSuggestionsProps ) => {

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>
                        DESCUBRIR
                    </p>

                    <h2 className={styles.title}>
                        Sugerencias para ti
                    </h2>
                </div>

                <button
                    type="button" 
                    className={styles.viewAll}
                >
                    Ver todas
                </button>
            </div>

            <div className={styles.list}>
                {users.map((user) => (
                    <article
                        key={user.id}
                        className={styles.userCard}
                    >
                        <div className={styles.userInfo}>
                            
                            {/*AVATAR*/}
                            <div className={styles.avatar}>
                                {user.avatar ? (
                                    <Image
                                        src={user.avatar}
                                        alt={user.username}
                                        fill
                                        sizes="48px"
                                        style={{
                                            objectFit: "cover",
                                        }}
                                    ></Image>
                                ) : (
                                    <span>
                                        {user.username
                                            .slice(0,2)
                                            .toUpperCase()}
                                    </span>
                                )}
                            </div>

                            {/** DATOS */}
                            <div className={styles.meta}>
                                <div className={styles.username}>
                                    <strong>
                                        {user.username}
                                    </strong>
                                    {user.verified && (
                                        <CheckCircle2
                                            size={14}
                                            className={styles.verified}
                                        ></CheckCircle2>
                                    )}
                                </div>
                                <span className={styles.fullName}>
                                    {user.fullName}
                                </span>
                                <span className={styles.followers}>
                                    {user.followers ?? 0 } 
                                    seguidores
                                </span>
                            </div>
                        </div>

                        <button 
                            type="button"
                            className={styles.followButton}
                        >
                            Seguir
                        </button>
                    </article>
                ))}
            </div>
        </section>
    );
};