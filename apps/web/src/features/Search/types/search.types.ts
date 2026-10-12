// ESTE TYPE REPRESENTA LOS POSIBLES TIPOS DE RESULTADOS
// CON EL FIN DE QUE PUEDE DEVOLVER A LA BUSQUEDA

export type SearchResultType = | "user" | "business" | "video";

// REPRESENTA UNA CUENTA PERSONAL O USUARIO

export interface SearchUser {
    id: string;
    username: string;
    fullName: string;
    avatar?: string;
    verified?: boolean;
    followers?: number;
    type: "user";
}

// REPRESENTA UNA PYME O NEGOCIO

export interface SearchBusiness{
    id: string;
    name: string;
    category: string;
    description?: string;
    image?: string;
    rating?: number;
    distance?: string;
    verified?: boolean;
    keywords: string[];
    type: "business";
}

//REPRESENTA CONTENIODO VISUAL QUE APARECERA
// EN EL GRID TIPO EXPLORAR

export interface SearchVideo {
    id: string;
    title: string;
    thumbnail: string;
    videoUrl?: string;
    views?: number;
    type: "video";
}

// ESTE TYPE PERMITE QUE UN RESULTADO DE BUSQUEDA
//PUEDA SER USUARIO, NEGOCIO O VIDEO
export type SearchResult = |SearchUser | SearchBusiness | SearchVideo;