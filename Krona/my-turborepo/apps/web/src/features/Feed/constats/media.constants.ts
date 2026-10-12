export const MEDIA_TYPES = {
    IAMGE: "image",
    VIDEO: "video",
    CARRUSEL: "carrusel",
} as const;

export type MediaType = 
    (typeof MEDIA_TYPES) [keyof typeof MEDIA_TYPES];