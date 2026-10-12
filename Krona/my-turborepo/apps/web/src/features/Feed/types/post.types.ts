export type MediaType = "Image" | "video" | "tiktok" | "carousel";


export interface Post {
    id: string;
    user: {
        username: string;
        avatar?: string;
        initials: string;
        verified?: boolean;
        isFollowing?: boolean;
    };
    media: {
        type: MediaType;
        urls:string[];                  //ESTO ERA PARA IMAGENES Y VIDEOS PARA EL CARRUSEL//
        duration?: string;              // SOLO VIDEOS EJEMPLO 1M//
    };
    likes: number;
    likedBy?: string;
    caption: string;
    commentsCount: number;
    createdAt: string;
    isSuggestion?: boolean;
}
