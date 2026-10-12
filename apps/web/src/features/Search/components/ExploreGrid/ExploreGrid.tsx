"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import styles from "./ExploreGrid.module.css";
import type { SearchVideo } from "../../types/search.types";

interface ExploreGridProps {
    videos: SearchVideo[];
}

export const ExploreGrid = ({
    videos,
}: ExploreGridProps ) => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>
                        EXPLORAR
                    </p>
                
                    <h2 className={styles.title}> 
                        Descubre contenido
                    </h2>
                </div>
            </div>

            <div className={styles.grid}>

                {videos.map((video, index) => (
                    <article
                        key={video.id}
                        className={`${styles.item} ${
                          index === 0
                            ? styles.featured
                            : ""
                        }`}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src={video.thumbnail}
                                alt={video.title}
                                fill
                                sizes="(max-width: 600px) 50vw, 250px"
                                className={styles.image}
                            />

                            <div className={styles.overlay}>
                                <Play
                                    size={18}
                                    fill="currentColor"
                                />
                            </div>

                            <div className={styles.views}>
                                {video.views ?? 0} vistas
                            </div>
                        </div>

                        <div className={styles.info}>
                            <p>{video.title}</p>
                        </div>
                        
                    </article>
                ))}
            </div>
        </section>
    );
};
