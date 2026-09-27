export interface ServiceItem {
    id: string;
    name: string;
    description: string;
    price: string;
    rating: number;
    reviews: number;
    emoji: string;
    image?: string;
}

export type OppStatus = "disponible" | "promocion" | "cerrado";

export interface Opportunity {
    id: string;
    name: string;
    distance: string;
    status: OppStatus;
    emoji: string;
    image?: string;
}