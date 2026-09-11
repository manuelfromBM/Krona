import type { AgendaItem } from "../types/agenda.types";

export const mockAgenda: AgendaItem[] = [
  {
    id: "1",
    clientName: "Camila",
    service: "Corte + Barba Premium",
    date: "Hoy",
    time: "15:00",
    status: "confirmada",
    businessName: "Barbería El Corte",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop",
  },
  {
    id: "2",
    clientName: "Matías",
    service: "Cambio de Aceite",
    date: "Mañana",
    time: "10:00",
    status: "pendiente",
    businessName: "Taller Express",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop",
  },
  {
    id: "3",
    clientName: "Felipe",
    service: "Limpieza Facial",
    date: "22 May",
    time: "14:00",
    status: "confirmada",
    businessName: "Estética Bella",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop",
  },
];
