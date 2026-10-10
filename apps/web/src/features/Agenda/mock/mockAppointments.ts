import type { Appointment } from "../types/agenda.types";

// Fechas relativas a "hoy" para que el mock nunca se vea desactualizado.
function isoDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

// Vista CLIENTE: mismas personas (el usuario), distintos negocios.
export const mockClientAppointments: Appointment[] = [
  {
    id: "c1",
    date: isoDate(0),
    time: "15:00",
    durationMinutes: 45,
    service: "Corte + Barba Premium",
    price: 15000,
    status: "confirmada",
    business: {
      name: "Barbería El Corte",
      avatar:
        "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=96&h=96&fit=crop",
    },
    client: { name: "Tú" },
  },
  {
    id: "c2",
    date: isoDate(1),
    time: "10:00",
    durationMinutes: 60,
    service: "Cambio de Aceite",
    price: 32000,
    status: "pendiente",
    business: {
      name: "Taller Express",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop",
    },
    client: { name: "Tú" },
  },
  {
    id: "c3",
    date: isoDate(4),
    time: "14:00",
    durationMinutes: 50,
    service: "Limpieza Facial",
    price: 22000,
    status: "confirmada",
    business: {
      name: "Estética Bella",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop",
    },
    client: { name: "Tú" },
  },
  {
    id: "c4",
    date: isoDate(-3),
    time: "11:30",
    durationMinutes: 40,
    service: "Manicure Spa",
    price: 12000,
    status: "completada",
    notes: "Excelente atención, pedir la misma esmaltadora la próxima vez.",
    business: {
      name: "Nails & Co",
      avatar:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=96&h=96&fit=crop",
    },
    client: { name: "Tú" },
  },
  {
    id: "c5",
    date: isoDate(-6),
    time: "09:00",
    durationMinutes: 30,
    service: "Entrenamiento Personalizado",
    price: 18000,
    status: "cancelada",
    notes: "Cancelada por el cliente con 2 horas de anticipación.",
    business: { name: "FitZone Gym" },
    client: { name: "Tú" },
  },
  {
    id: "c6",
    date: isoDate(9),
    time: "16:30",
    durationMinutes: 90,
    service: "Masaje Relajante",
    price: 28000,
    status: "pendiente",
    business: {
      name: "Spa Armonía",
      avatar:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=96&h=96&fit=crop",
    },
    client: { name: "Tú" },
  },
];

// Vista NEGOCIO/PYME: mismo negocio, distintos clientes y empleados.
export const mockBusinessAppointments: Appointment[] = [
  {
    id: "b1",
    date: isoDate(0),
    time: "09:30",
    durationMinutes: 45,
    service: "Corte + Barba Premium",
    price: 15000,
    status: "confirmada",
    business: { name: "Barbería El Corte" },
    client: {
      name: "Camila Rojas",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop",
    },
    employeeName: "Diego (barbero)",
  },
  {
    id: "b2",
    date: isoDate(0),
    time: "11:00",
    durationMinutes: 30,
    service: "Corte Clásico",
    price: 9000,
    status: "pendiente",
    business: { name: "Barbería El Corte" },
    client: { name: "Matías Soto" },
    employeeName: "Diego (barbero)",
  },
  {
    id: "b3",
    date: isoDate(0),
    time: "17:00",
    durationMinutes: 60,
    service: "Afeitado + Spa Facial",
    price: 18000,
    status: "pendiente",
    business: { name: "Barbería El Corte" },
    client: {
      name: "Felipe Araya",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop",
    },
    employeeName: "Ignacio (barbero)",
  },
  {
    id: "b4",
    date: isoDate(1),
    time: "10:00",
    durationMinutes: 45,
    service: "Corte + Barba Premium",
    price: 15000,
    status: "confirmada",
    business: { name: "Barbería El Corte" },
    client: { name: "Javiera Muñoz" },
    employeeName: "Diego (barbero)",
  },
  {
    id: "b5",
    date: isoDate(-2),
    time: "16:00",
    durationMinutes: 30,
    service: "Corte Clásico",
    price: 9000,
    status: "completada",
    business: { name: "Barbería El Corte" },
    client: { name: "Benjamín Vera" },
    employeeName: "Ignacio (barbero)",
  },
  {
    id: "b6",
    date: isoDate(-1),
    time: "12:30",
    durationMinutes: 45,
    service: "Corte + Barba Premium",
    price: 15000,
    status: "cancelada",
    notes: "Cliente no se presentó.",
    business: { name: "Barbería El Corte" },
    client: { name: "Tomás Herrera" },
    employeeName: "Diego (barbero)",
  },
  {
    id: "b7",
    date: isoDate(2),
    time: "09:00",
    durationMinutes: 30,
    service: "Corte Clásico",
    price: 9000,
    status: "pendiente",
    business: { name: "Barbería El Corte" },
    client: { name: "Sofía Contreras" },
    employeeName: "Ignacio (barbero)",
  },
];
