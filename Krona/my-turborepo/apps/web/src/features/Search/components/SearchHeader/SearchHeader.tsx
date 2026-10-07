"use client";

import { ArrowLeft, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./SearchHeader.module.css";

interface SearchHeaderProps {
    query: string;
    onQueryChange: (value: string) => void;
    onClear: () => void;
}

export const SearchHeader = ({
    query,
    onQueryChange,
    onClear,
}: SearchHeaderProps) => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <header className={styles.header}>
            {/* BOTON VOLVER */}
            <button
                type="button"
                className={styles.backButton}
                onClick={handleBack}
                aria-label="Volver"
            >
                <ArrowLeft size={20}></ArrowLeft>
            </button>

            {/* BUSCADOR */}
            <div className={styles.searchBox}>
                <Search
                    size={18}
                    className={styles.searchIcon}
                ></Search>

                <input 
                    type="text" 
                    value={query}
                    onChange={(event) =>
                        onQueryChange(event.target.value)
                    }
                    placeholder="Buscar cuentas, negocios, servicios o video"
                    autoFocus
                />

                {/* MOSTRAMOS LA X SOLO SI HAY TEXTO */}
                {query.length > 0 && (
                    <button
                        type="button"
                        className={styles.clearButton}
                        onClick={onClear}
                        aria-label="Limpiar busqueda"
                    >
                        <X size={17}></X>
                    </button>
                )}
            </div>
        </header>
    );
};
