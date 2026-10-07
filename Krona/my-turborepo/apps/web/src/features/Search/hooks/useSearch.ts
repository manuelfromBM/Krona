"use client";

import { useEffect, useMemo, useState } from "react";
import { mockBusinesses, mockExploreVideos, mockSuggestedUsers } from "../mocks/mockSearch";
import type { SearchResult } from "../types/search.types";

export const useSearch = (query: string) => {
    //ACA NOS DICE SI ESTAMOS SIMULANDO UNA BUSQUEDA
    const [isLoading, setIsLoading] = useState(false);

    //RESULTADO FINAL
    const [results, setResults] = useState<SearchResult[]>([]);

    //ESTA VARIABLE NOS AYUDA A SABER SI EL USUARIO
    // REALMENTE ESCRIBIO ALGO O SI EL BUSCADOR ESTA VACIO
    const hasQuery = query.trim().length > 0;

    //JUNTAMOS TODO LOS DATOS QUE NOS PUEDE APARECER
    //COMO RESULTADO DE BUSQUEDA
    const searchableItems = useMemo<SearchResult[]>(() => {
        return [
            ...mockSuggestedUsers,
            ...mockBusinesses,
            ...mockExploreVideos, 
        ]; 
    }, []);

    useEffect(() => {
        //SI EL INPUT ESTA VACIO:
            //-QUITAMOS LOADING
            //-VACIAMOS RESULTADOS
            //-MOSTRAMOS LAS SUGERENCIAS Y EXPLORAR
            if (!hasQuery) {
                setIsLoading(false);
                // En la pantalla inicial mostramos todo agrupado, como un marketplace.
                setResults(searchableItems);
                return;
            }

            //CUANDO EL USUARIO EMPIEZA A ESCRIBIR
            //SIMULAMOS UNA CARGA COMO SI ESTUVIERAMOS
            //ESPERANDO UNA RESPUESTA DEL BACKEND
            setIsLoading(true);

            const timer = setTimeout(() => {
                const normalizedQuery = query
                .trim()
                .toLowerCase();
                
                const filteredResults = searchableItems.filter((item) => {
                    //CUENTA Y USUARIO
                    if (item.type === "user") {
                        return (
                            item.username
                            .toLowerCase()
                            .includes(normalizedQuery) ||
                            item.fullName
                            .toLowerCase()
                            .includes(normalizedQuery)
                        );
                    }

                    //NEGOCIO Y PYME
                    if (item.type === "business") {
                        const matchesName = item.name
                            .toLowerCase()
                            .includes(normalizedQuery);

                        const matchesCategory = item.category
                            .toLowerCase()
                            .includes(normalizedQuery);

                        const matchesDescription = item.description
                            ?.toLowerCase()
                            .includes(normalizedQuery);

                        const matchesKeyword = item.keywords.some(
                            (keyword) =>
                                keyword
                                .toLowerCase()
                                .includes(normalizedQuery)
                        );

                        return (
                            matchesName || matchesCategory || matchesDescription || matchesKeyword
                        );
                        
                    }
                    //VIDEO
                    if (item.type === "video") {
                        return item.title
                        .toLowerCase()
                        .includes(normalizedQuery);
                    }

                    return false;
                });

                setResults(filteredResults);
                setIsLoading(false);
            }, 650);

            //SI EL USUARIO SIGUE ESCRIBIENDO ANTES DE QUE 
            // TERMINEN LOS 650MS ES CANCELADO LA BUSQUEDA ANTERIOR

            return () => {
                clearTimeout(timer);
            };
    }, [
        query,
        hasQuery,
        searchableItems,
    ] );

    return {
        isLoading,
        results,
        hasQuery,

        //LOS DEJAMOS DISPONIBLE PARA LA PANTALLA INICIAL
        suggestedUsers: mockSuggestedUsers,
        exploreVideos: mockExploreVideos,
    };
};
