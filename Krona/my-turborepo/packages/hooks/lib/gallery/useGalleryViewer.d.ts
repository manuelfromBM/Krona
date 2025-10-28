export default function useGalleryViewer(images: string[], preload?: boolean): {
    visible: boolean;
    activateIndex: number;
    open: (index: number) => void;
    close: () => void;
    next: () => void;
    prev: () => void;
};
//# sourceMappingURL=useGalleryViewer.d.ts.map