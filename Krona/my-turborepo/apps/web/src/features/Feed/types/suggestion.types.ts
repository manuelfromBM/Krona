export interface Suggestion {
    id: string;
    username: string;
    initials: string;
    avatar?: string;
    mutualinfo : string; // los 9 mas te sigue
}

export interface AdBanner {
    id: string;
    image?: string;
    emoji?: string;
    sponsor: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref:string;
}