import type { Post } from "../types/post.types";

export const mockPosts: Post[] = [

    {
        id: "1",
        user: { 
            username: "rap_ratcl", 
            initials: "RT", 
            verified: true,
            isFollowing: true, 
            avatar: "https://media.istockphoto.com/id/1212330475/vector/clothes-and-accessories-logo-round-linear-of-clothes-hanger-on-white.jpg?s=2048x2048&w=is&k=20&c=SXyhw8YDGzZ9Au1owIfGAWtrBUA-VGXnYYitVm87IWU=" 
        },

        media: { 
            type: "image",
            urls: ["https://rapratsupply.com/cdn/shop/files/60D6D4F6-858F-402C-874B-B4564FB2CAB2.png?v=1779256736&width=1920"] 
        },
        likes: 329, likedBy: "raulito.prou",
        caption: "La temperatura ya comenzo y nosotros estamos trabajando para traerles una oferta imperdible para quienes quieran su conjunto completo.",
        commentsCount: 31,
        comments: [
            {
                id: "comment-1-1",
                username: "Juan P.",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop",
                text: "Excelente atención y muy profesional 👌",
                createdAt: "2 h",
            },
            {
                id: "comment-1-2",
                username: "María G.",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop",
                text: "Me encantó el resultado, 100% recomendado.",
                createdAt: "1 h",
            },
        ],
        createdAt: "hace 9 horas",
    },
    {
        id: "2",
        user: { username: "Viara", 
            initials: "VR", 
            verified: true, 
            isFollowing: false,  
            avatar: "https://media.istockphoto.com/id/1252976100/vector/luxury-beauty-eye-lashes-cosmetic-symbol-icon-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=CI0d4BUa_oZCfyI3-jQpOjPpyBmvoXjlKIyvlyo6W9M="
        },
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
        comments: [
            {
                id: "comment-2-1",
                username: "Camila R.",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop",
                text: "Qué lindo trabajo, quiero reservar una hora.",
                createdAt: "45 min",
            },
            {
                id: "comment-2-2",
                username: "Sofía M.",
                avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop",
                text: "La atención es excelente 💚",
                createdAt: "20 min",
            },
        ],
        createdAt: "hace 2 horas",
    },  
    {   
        id: "3",
        user: { username: "24horaschile", 
            initials: "24", 
            verified: true, 
            isFollowing: false,  
            avatar:"https://media.istockphoto.com/id/1157095849/vector/world-news-concept-vector-globe-illustration-journalism-theme-live-news.jpg?s=1024x1024&w=is&k=20&c=6oNDeXcu3qu6miwKxaClqxGzPqtEb2s-ltwOodYfLM4="
        },
        media: { 
            type: "video", 
            urls: ["https://media.istockphoto.com/id/2206860352/video/watching-online-news-article-on-mobile-phone-and-laptop.mp4?s=mp4-640x640-is&k=20&c=CxdODOZJTzOy5b2YMaRsrY0Zu2jG_QNfttOx36Q9Zs0="], 
            duration: "0:11" },
        likes: 892,
        caption: "Últimas noticias del día en vivo.",
        commentsCount: 74,
        comments: [
            {
                id: "comment-3-1",
                username: "Diego A.",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop",
                text: "Gracias por mantenernos informados.",
                createdAt: "3 h",
            },
            {
                id: "comment-3-2",
                username: "Valentina C.",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop",
                text: "Muy buena cobertura de la noticia.",
                createdAt: "2 h",
            },
        ],
        createdAt: "hace 7 horas",
        isSuggestion: true,
    },
];
