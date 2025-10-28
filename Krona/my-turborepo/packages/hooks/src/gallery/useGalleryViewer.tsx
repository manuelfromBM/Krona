import { useState, useCallback, useEffect } from 'react';
import { Image } from 'react-native';
//___________________________________________________________________________________________________
//Este hook no tiene compatibilidad con web, por lo tanto en el futuro se debe incorporar para su uso
//___________________________________________________________________________________________________

export default function useGalleryViewer(images: string[], preload: boolean = false) {
    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const open = useCallback((index: number) => {
        setActiveIndex(index);
        setVisible(true);
    }, []);

    const close = useCallback(() => {
        setVisible(false);
    }, []);

    const next = useCallback(() => {
        setActiveIndex((i: number) => (i + 1) % images.length)
    }, [images.length]); 

    const prev = useCallback(() => {
        setActiveIndex((i: number) => (i - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() =>{
        if (preload) {
            images.forEach((src) => {
                Image.prefetch(src);
            });
        }
    }, [images, preload]);

    return {
        visible,
        activeIndex,
        open,
        close,
        next,
        prev,
    };
}