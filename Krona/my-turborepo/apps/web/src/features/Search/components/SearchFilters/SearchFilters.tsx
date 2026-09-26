"use client";

import styles from "./SearchFilters.module.css";

export type SearchFilter = | "all" | "user" | "business" | "video";

interface SearchFiltersProps {
    activeFilter: SearchFilter;

    onFilterChange: (
        filter: SearchFilter
    ) => void;

    counts: {
        all: number;
        user: number;
        business: number;
        video: number;
    };
}

export const SearchFilters = ({
    activeFilter,
    onFilterChange,
    counts,
}: SearchFiltersProps) => {
    const filters: {
        label: string;
        value: SearchFilter;
        count: number;
    }   [] = [
        {
            label: "Todos",
            value: "all",
            count: counts.all,
        },

        {
            label: "Usuarios",
            value: "user",
            count: counts.user,
        },

        {
            label: "Pymes",
            value: "business",
            count: counts.business,
        },

        {
            label: "Videos",
            value: "video",
            count: counts.video,
        },
    ];

  return (
        <div className={styles.filters}>
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    type="button"
                    className={`${styles.filterButton} ${
                        activeFilter === filter.value
                            ? styles.active
                            : ""
                    }`}
                    onClick={() =>
                        onFilterChange(filter.value)
                    }
                    >
                    <span>
                        {filter.label}
                    </span>
                
                    <span
                        className={styles.count}
                    >
                        {filter.count}
                    </span>
                </button>
            ))}
        </div>
    );
};