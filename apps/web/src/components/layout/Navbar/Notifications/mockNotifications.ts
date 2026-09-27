import type { NotificationItem } from "./notification.types";

// Datos temporales hasta conectar las notificaciones con el backend.
export const mockNotifications: NotificationItem[] = [
  {
    id: "notification-1",
    title: "Reserva confirmada",
    description: "Tu cita en Barbería El Corte quedó confirmada.",
    time: "Hace 5 min",
    read: false,
    type: "reservation",
  },
  {
    id: "notification-2",
    title: "Nuevo mensaje",
    description: "Estética Bella respondió tu consulta.",
    time: "Hace 20 min",
    read: false,
    type: "message",
  },
  {
    id: "notification-3",
    title: "Promoción cerca de ti",
    description: "Taller Express tiene un 20% de descuento hoy.",
    time: "Hace 1 h",
    read: false,
    type: "promotion",
  },
];
