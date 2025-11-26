import { useState, useCallback, useEffect } from 'react';
import { Image } from 'react-native';

export default function useBusqudaMo(images: string[], preload: boolean = false, initialIndex: number = 0) {
    const [activeIndex, setActiveIndex] = useState<number>(initialIndex);

    useEffect(() => {
        setActiveIndex(initialIndex);
    }, [initialIndex]);

    const next = useCallback(() => {
        setActiveIndex((i: number) => (i + 1) % images.length)
    }, [images.length]);

    const prev = useCallback(() => {
        setActiveIndex((i: number) => (i - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        if (preload) {
            images.forEach((src) => {
                Image.prefetch(src);
            });
        }
    }, [images, preload]);

    return {
        activeIndex,
        next,
        prev,
    };
}