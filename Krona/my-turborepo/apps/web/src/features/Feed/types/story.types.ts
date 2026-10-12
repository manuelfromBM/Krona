export type StoryBadge = "disponible" | "promocion" | "nuevo" | "cercaDeTi";

interface StorySlide {
    //**ESTE COMANDO SIRVE PARA VIDEOS Y FOTOS ASI
    // LA IMAGEN DEBE LLAMARSE {IMAGEN} EN VEZ DE {Image} PARA EVITAR 
    // FUTUROS ERRORES CON EL BACKEND */ 

    type: "image" | "video";
    url: string;
}

export interface Story {
    id: string;
    username: string;
    avatar?: string;
    slides: StorySlide[]; // URLS DE IMAGEN O VIDEO
    time: string;
    seen?: boolean;
    badge?: StoryBadge;
    badgeLabel?: string;

                        // !!!!ESTA INICIAL SE DEJA PARA NO ROMPER EL CODIGO DEL BACKENDT 
    initials: string; //<=== AL MOMENTO DE ESTAR EN PRODUCION | SI EL CLIENTE NO COLOCA LA 
                        // IMAGEN SE COLOCARA SU INICIALES!!!
    color?: string;
    
}