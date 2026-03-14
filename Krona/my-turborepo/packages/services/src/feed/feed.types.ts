export interface FeedUserDTO {
    id: string;
    nombre: string;
    avatar: string;
}

export interface FeedPostDTO {
    id:string
    descripcion: string;
    imagen: string;
    fecha: string;
    usuario: FeedUserDTO;
    likes: number;
    comentarios: number;
}

export interface FeedResponse {
    posts: FeedPostDTO[];
    nextCursor?: string;
}