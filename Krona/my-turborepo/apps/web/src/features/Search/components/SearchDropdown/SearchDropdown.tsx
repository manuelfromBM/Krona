"use client"

import Image from "next/image";
import { BadgeCheck, Search, Store, } from "lucide-react";
import styles from "./SearchDropdown.module.css";
import type { SearchResult } from "../../types/search.types";

interface SearchDropdownProps {
    query: string;
    results: SearchResult[];
    onViewMore: () => void;
    onSelectResult: ( result: SearchResult ) => void;
}

export const SearchDropdown = ({ query, results, onViewMore, onSelectResult }: SearchDropdownProps) => {
    
    /**
     * SI NO A ESCRITO 
     * NO MOSTRAMOS LA VENTANA
     */

    if (!query.trim()) {
        return null;
    }

    /**
     * EN EL BUSCADOR RAPIDO QUEREMOS MOSTRAR
     * PRINCIPALMENTE CUENTAS Y NEGOCIOS
     * LOS VIDEOS LOS VEREMOS DESPUES DENTRO DE LA 
     * PANTALLA COMPLETA
     */

    const quickResults = results.filter (
        (result) => result.type === "user" || result.type === "business"
    )
    .slice(0,5);

    return (
        <div className={styles.dropdown}>

            {/* RESULTADOS RÁPIDOS */}
            {quickResults.length > 0 ? (
                <div className={styles.results}>
                    {quickResults.map((result) => {
                    
                        // =========================
                        // USUARIO
                        // =========================
                        
                        if (result.type === "user") {
                            return (
                                <button
                                    key={result.id}
                                    type="button"
                                    className={styles.result}
                                    onClick={() =>
                                        onSelectResult(result)
                                    }
                                >
                                    <div className={styles.avatar}>
                                        {result.avatar ? (
                                            <Image
                                                src={result.avatar}
                                                alt={result.username}
                                                fill
                                                sizes="42px"
                                                className={styles.image}
                                            ></Image>
                                        ) : (
                                            <span>
                                                {result.username
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </span>
                                        )}
                                    </div>

                                    <div className={styles.info}>
                                        <div className={styles.name}>
                                            <strong>
                                                {result.fullName}
                                            </strong>

                                            {result.verified && (
                                                <BadgeCheck
                                                    size={14}
                                                    className={styles.verified}
                                                ></BadgeCheck>
                                            )}
                                        </div>
                                        
                                        <span>
                                            @{result.username}
                                        </span>
                                    </div>
                                </button>
                            );
                        }
                    
                        // =========================
                        // NEGOCIO / PYME
                        // =========================
                    
                        if (result.type === "business") {
                            return (
                              <button
                                    key={result.id}
                                    type="button"
                                    className={styles.result}
                                    onClick={() =>
                                        onSelectResult(result)
                                    }
                              >
                                <div className={styles.avatar}>
                                    {result.image ? (
                                        <Image
                                            src={result.image}
                                            alt={result.name}
                                            fill
                                            sizes="42px"
                                            className={styles.image}
                                        ></Image>
                                    ) : (
                                        <Store size={18} />
                                    )}
                                </div>
                                
                                <div className={styles.info}>
                                    <div className={styles.name}>
                                        <strong>
                                            {result.name}
                                        </strong>

                                        {result.verified && (
                                            <BadgeCheck
                                                size={14}
                                                className={styles.verified}
                                            ></BadgeCheck>
                                        )}
                                    </div>
                                    
                                    <span>
                                        {result.category}
                                    </span>
                                </div>
                              </button>
                            );
                        }
                        return null;
                    })}
                </div>
                
                ) : (
                    /* NO ENCONTRÓ NADA */
                    <div className={styles.empty}>
                        <Search size={20} />
            
                        <p>
                            No encontramos una cuenta rápidamente.
                        </p>
                    </div>
            )}

            {/* VER MÁS */}
            <button
                type="button"
                className={styles.viewMore}
                onClick={onViewMore}
            >
                <Search size={16} />
        
                <span>
                    Ver más resultados para &quot;{query}&quot;
                </span>
        
                <strong>→</strong>
            </button>
        </div>
    );
};
