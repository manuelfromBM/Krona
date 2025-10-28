import { useState, useCallback, useEffect } from 'react';
export default function useGalleryViewer(images, preload = false) {
    const [visible, setVisible] = useState(false);
    const [activateIndex, setActiveIndex] = useState(0);
    const open = useCallback((index) => {
        setActiveIndex(index);
        setVisible(true);
    }, []);
    const close = useCallback(() => {
        setVisible(false);
    }, []);
    const next = useCallback(() => {
        setActiveIndex((i) => (i + 1) % images.length);
    }, [images.length]);
    const prev = useCallback(() => {
        setActiveIndex((i) => (i - 1 + images.length) % images.length);
    }, [images.length]);
    useEffect(() => {
        if (preload) {
            images.forEach((src) => {
                const img = new Image();
                img.src = src;
            });
        }
    }, [images, preload]);
    return {
        visible,
        activateIndex,
        open,
        close,
        next,
        prev,
    };
}
//# sourceMappingURL=useGalleryViewer.js.map