import type { Post } from "../types/post.types";

export const mockPosts: Post[] = [

    {
        id: "1",
        user: { username: "rap_ratcl", initials: "RT", verified: true, isFollowing: true },
        media: { 
            type: "image",
            urls: ["https://rapratsupply.com/cdn/shop/files/60D6D4F6-858F-402C-874B-B4564FB2CAB2.png?v=1779256736&width=1920"] 
        },
        likes: 329, likedBy: "raulito.prou",
        caption: "La temperatura ya comenzo y nosotros estamos trabajando para traerles una oferta imperdible para quienes quieran su conjunto completo.",
        commentsCount: 31,
        createdAt: "hace 9 horas",
    },
    {
        id: "2",
        user: { username: "Viara", initials: "VR", verified: true, isFollowing: false },
        media: { 
            type: "carrusel",
             urls: [
                "https://viara.cl/cdn/shop/files/IMG-9703.png?v=1770652210&width=600",
                "https://viara.cl/cdn/shop/files/IMG-9677.jpg?v=1733276949&width=600", 
                "https://viara.cl/cdn/shop/files/IMG-9706.jpg?v=1733283680&width=600"
            ] },

        likes: 148,
        caption: "Descubre los mejores negocios cerca de ti ",
        commentsCount: 12,
        createdAt: "hace 2 horas",
    },  
    {   
        id: "3",
        user: { username: "24horaschile", initials: "24", verified: true, isFollowing: false },
        media: { 
            type: "video", 
            urls: ["https://media.istockphoto.com/id/2206860352/video/watching-online-news-article-on-mobile-phone-and-laptop.mp4?s=mp4-640x640-is&k=20&c=CxdODOZJTzOy5b2YMaRsrY0Zu2jG_QNfttOx36Q9Zs0="], 
            duration: "0:11" },
        likes: 892,
        caption: "Últimas noticias del día en vivo.",
        commentsCount: 74,
        createdAt: "hace 7 horas",
        isSuggestion: true,
    },
];