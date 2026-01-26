import { useState, useEffect } from "react";

export default function useSearchDebounce(delay = 500) {
    const [query, setQuery] = useState("");
    const [debounced, setDebounced] = useState("");

    useEffect(() => {
        const id = setTimeout(() => setDebounced(query), delay);
        return () => clearTimeout(id);
    }, [query, delay]);

    return { query, setQuery, debounced };
}
