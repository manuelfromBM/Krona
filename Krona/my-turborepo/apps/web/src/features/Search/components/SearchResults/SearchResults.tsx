"use client";

import Image from "next/image";
import { BadgeCheck, MapPin, Play, Star, User, Store, Search, Verified } from "lucide-react";
import styles from "./SearchResults.module.css";
import { SearchResult } from "../../types/search.types";

interface SearchResultsProps {
    results: SearchResult[];
}

export const SearchResults = ({
    results,
}: SearchResultsProps) => {
    
    // SI NO EXISTE UN RESULTADO MOSTRAMOS MENSAJE
    if (results.length === 0) {
        return (
            <section className={styles.emptyState}>
                
                <div className={styles.emptyIcon}>
                    <User size={24}></User>
                </div>

                <h3>No encontramos resultados</h3>

                <p>
                    Intenta buscar otro nombre,
                    negocio, servicio o video.
                </p>

            </section>
        );
    }

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <p className={styles.eyebrow}>
                    Busqueda
                </p>

                <h2 className={styles.title}>
                    Resultado
                </h2>

                <span className={styles.resultCount}>
                    {results.length} resultados
                </span>
            </div>

            <div className={styles.list}>
                {results.map((result) => {
                    /*
                     *  DEPENDIENDO DEL "TYPE"
                     *  MOSTRAMOS UN DISEÑO DIFERENTE
                     *  ESTO ES POSIBLE PORQUE EL TYPE DEFINE:
                     *  TYPE: "USER"
                     *  TYPE: "BUSINESS"
                     *  TYPE: "VIDEO"
                     *  ASI QUE NO AHI FORMA DE EQUIVOCARSE WN
                    */

                    //_______________________
                    // RESULTADO: USUARIO
                    //_______________________

                    if (result.type  === "user") {
                        return (
                            <article
                                key={result.id}
                                className={styles.resultCard}
                            >
                                <div className={styles.avatar}>
                                    {result.avatar ? (
                                        <Image
                                            src={result.avatar}
                                            alt={result.username}
                                            fill
                                            sizes="56px"
                                            className={styles.image}
                                        ></Image>
                                    ) : (
                                        <span>
                                            {result.username
                                                .slice(0, 2)
                                                .toUpperCase()
                                            }
                                        </span>
                                    )}
                                </div>
                                    <div className={styles.content}>
                                        <div className={styles.nameRow}>
                                            <strong>
                                                {result.fullName}
                                            </strong>

                                            {result.verified && (
                                                <BadgeCheck
                                                    size={16}
                                                    className={styles.verified}
                                                ></BadgeCheck>
                                            )}
                                        </div>
                                        
                                        <span className={styles.secondary}>
                                            @{result.username}
                                        </span>

                                        <span className={styles.detail}>
                                            {result.followers ?? 0} seguidores
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        className={styles.actionButton}
                                    >
                                        Ver perfil
                                    </button>
                            </article>
                        );
                    } 

                    //__________________________
                    //RESULTADO: NEGOCIO Y PYME
                    //__________________________

                    if (result.type === "business") {
                        return (
                            <article
                                key={result.id}
                                className={styles.resultCard}
                            >
                                <div className={styles.avatar}>
                                    {result.image ? (
                                        <Image
                                            src={result.image}
                                            alt={result.name}
                                            fill
                                            sizes="56px"
                                            className={styles.image}
                                        ></Image>
                                    ) : (
                                        <Store size={22}></Store>
                                    )}
                                </div>

                                    <div className={styles.content}>
                                        <div className={styles.nameRow}>
                                            <strong>
                                                {result.name}
                                            </strong>

                                            {result.verified && (
                                                <BadgeCheck
                                                    size={16}
                                                    className={styles.verified}
                                                ></BadgeCheck>
                                            )}
                                        </div>

                                        <span className={styles.secondary}>
                                            {result.category}
                                        </span>

                                        <div className={styles.businessInfo}>
                                            {result.rating !== undefined && (
                                                <span>
                                                    <Star
                                                        size={13}
                                                        fill="currentColor"
                                                    ></Star>
                                                    {result.rating}
                                                </span>
                                            )}

                                            {result.distance && (
                                                <span>
                                                    <MapPin
                                                        size={13}
                                                    ></MapPin>

                                                    {result.distance}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className={styles.actionButton}
                                    >
                                        Ver negocio
                                    </button>
                            </article>
                        );
                    }

                    //_________________
                    //RESULTADO: VIDEO
                    //_________________
                    if (result.type === "video") {
                        return (
                            <article
                                key={result.id}
                                className={styles.resultCard}
                            >
                                <div className={styles.videoThumbnail}>
                                    <Image
                                        src={result.thumbnail}
                                        alt={result.title}
                                        fill
                                        sizes="80px"
                                        className={styles.image}
                                    ></Image>

                                    <div className={styles.playIcon}>
                                        <Play
                                            size={15}
                                            fill="currentColor"
                                        ></Play>
                                    </div>
                                </div>

                                <div className={styles.content}>
                                    <strong>
                                        {result.title}
                                    </strong>

                                    <span className={styles.secondary}>
                                        Video
                                    </span>

                                    <span className={styles.detail}>
                                        {result.views ?? 0} vistas
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className={styles.actionButton}
                                >
                                    Ver video
                                </button>
                            </article>
                        );
                    }

                    return null;
                })}
            </div>
        </section>
    );
};