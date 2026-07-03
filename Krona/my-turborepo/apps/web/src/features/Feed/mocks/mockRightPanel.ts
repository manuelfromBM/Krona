import type { Suggestion, AdBanner } from "../types/suggestion.types";

export const mockSuggestions: Suggestion[] = [

    {id: "1", username:"matias",  initials:"MT", mutualinfo:"_matias_ y 9 mas te siguen"},
    {id: "2",  username:"CAMILA", initials:"CA", mutualinfo:"claudio sigue esta cuenta"},
    {id: "3", username:"Mateo", initials:"MA", mutualinfo:"_Mateon_tulon y 2 mas te siguen"},
    {id: "4", username:"Esteban Castillo", initials:"ES", mutualinfo:"jofita_ y 4 mas te siguen"},
    {id: "5", username:"Pasteleria", initials:"PA", mutualinfo:"PsteleriaJose y 2 mas te siguen"},

];

export const mockAd: AdBanner = {
    id: "1",
    emoji: "CACA", //EN VEZ DE UN EMOJIN COLOCAR UNA IMAGEN DE LOS NEGOCIOS
    sponsor: "Patrocionado",
    title: "fleiva Burger",
    description: "Las mejores hamburguesas de la ciudad. ¡Pide ahora y recibe 10% de descuento!",
    ctaLabel: "Ver negocio",
    ctaHref: "/negocios/fleiva-burger",

    

    
};