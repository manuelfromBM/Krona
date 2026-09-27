import type { ServiceItem, Opportunity } from "../types/centerPanel.types";

export const mockServices: ServiceItem[] = [
    { id:"1", name:"Barbería El Corte",  description:"Corte + Barba Premium",    price:"$12.000", rating:4.9, reviews:128, emoji:"✂️" },
    { id:"2", name:"Estética Bella",     description:"Limpieza Facial Profunda", price:"$18.000", rating:5.0, reviews:96,  emoji:"💄" },
    { id:"3", name:"Taller Express",     description:"Cambio de Aceite",         price:"$25.000", rating:4.8, reviews:73,  emoji:"🔧" },
    { id:"4", name:"Mecánica 24/7",      description:"Diagnóstico General",      price:"$30.000", rating:4.9, reviews:102, emoji:"🚗" },
];

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    name: "Barbería Legacy",
    distance: "A 300 m",
    status: "disponible",
    emoji: "✂️",
  },
  {
    id: "2",
    name: "Mecánica Express",
    distance: "A 450 m",
    status: "disponible",
    emoji: "🔧",
  },
  {
    id: "3",
    name: "Estética Glow",
    distance: "A 600 m",
    status: "promocion",
    emoji: "💄",
  },
];