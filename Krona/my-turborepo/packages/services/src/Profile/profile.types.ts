export interface ProfileServiceDTO {

    id: string;
    name: string;
    price: number;
}

export interface ProfileLinkDTO {
    type: "whatsapp" | "email" | "website" | "instagram";
    url: string;
}

export interface ProfileMediaDTO {
    id: string;
    type: "image" | "video";
    url: string;
}

export interface ProfileDTO {
    id: string;
    fullName: string;
    username: string;
    avatar: string;

    followers: number;
    following: number;
    posts: number;

    description?: string;

    services?: ProfileServiceDTO[]

    media?: ProfileMediaDTO[]

    links?: ProfileLinkDTO[]

    location?: string
}

export interface ProfileResponse {
    profile: ProfileDTO;
}



//agregar servicios en una lista
//precios
//descripcion del negocio
//Una lista de links de videos y imagenes
//Ubicacion o ubicacion de contacto de wsp email (tipo links)
//