export interface AgendaItem {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status:
    | "confirmada"
    | "pendiente"
    | "cancelada";
  businessName?: string;
  avatar?: string;
}

// ──────────────────────────────────────────────
// Vistas completas de agenda (cliente y negocio)
// ──────────────────────────────────────────────

export type AppointmentStatus =
  | "confirmada"
  | "pendiente"
  | "cancelada"
  | "completada";

export interface AppointmentParty {
  name: string;
  avatar?: string;
}

/**
 * Una cita siempre tiene un negocio y un cliente; cada vista (cliente/negocio)
 * decide cuál de las dos partes destacar.
 */
export interface Appointment {
  id: string;
  date: string; // ISO yyyy-mm-dd
  time: string; // HH:mm
  durationMinutes: number;
  service: string;
  price: number;
  status: AppointmentStatus;
  notes?: string;
  business: AppointmentParty;
  client: AppointmentParty;
  employeeName?: string;
}

export type AgendaTabKey = "proximas" | "pendientes" | "pasadas" | "canceladas";

export interface AgendaStats {
  todayCount: number;
  pendingCount: number;
  confirmedCount: number;
  periodRevenue: number;
}
