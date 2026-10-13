export type MediaType = "image" | "video" | "carrusel";

export interface Media {
    type: MediaType;
    urls:  string[];
    duration?: string;
}