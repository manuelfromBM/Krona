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
}