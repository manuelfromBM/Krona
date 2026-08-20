import type { AgendaItem } from "../types/agenda.types";

export const mockAgenda: AgendaItem[] = [
  {
    id: "1",
    clientName: "Camila",
    service: "Corte + Barba",
    date: "Hoy",
    time: "10:00",
    status: "confirmada",
  },
  {
    id: "2",
    clientName: "Matías",
    service: "Corte",
    date: "Hoy",
    time: "11:30",
    status: "pendiente",
  },
  {
    id: "3",
    clientName: "Felipe",
    service: "Barba",
    date: "Hoy",
    time: "13:00",
    status: "confirmada",
  },
];