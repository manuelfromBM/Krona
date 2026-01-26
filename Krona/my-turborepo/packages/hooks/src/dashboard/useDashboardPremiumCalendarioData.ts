import { useMemo, useState } from "react";

export type EstadoEvento =
  | "agendado" 
  | "confirmado"
  | "reagendado"
  | "cancelado";

  type CargaDia = "libre" | "medio" | "lleno";

export interface CalendarioEvento {
  id: string;

  fecha: Date; // YYYY-MM-DD
  horaInicio: string;
  duracion: number;

  cliente: string;
  telefono?: string;

  servicio: string;
  tipoServicio?: string;

  estado: EstadoEvento;

  precio: number;
  abono: number;
  metodoPago?: "efectivo" | "tarjeta" | "transferencia" | "credito";
  pagado: boolean;

  calificacion?: number; // la calificacion es de 1 al 5 
  observaciones?: string; // notas del cliente o servicio
}

export const useDashboardPremiumCalendarioData = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  /* ---------------- EVENTOS MOCK ---------------- */
  const [eventos, setEventos ]= useState<CalendarioEvento[] >([
    // SE CAMBIA ESTE CODIGO: const eventos: CalendarioEvento[] = [
     {
      id: "1",
      fecha: new Date(2026, 0, 11),
      horaInicio: "10:00",
      cliente: "Juan Pérez",
      servicio: "Corte de cabello",
      duracion: 30,
      precio: 8000,
      telefono: "9 1234 5678",
      estado: "confirmado",
      abono: 10000,
      pagado: true,
    },
    {
      id: "2",
      fecha: new Date(2026, 0, 18),
      horaInicio: "11:00",
      cliente: "Matias Palma",
      servicio: "Corte de cabello",
      duracion: 30,
      precio: 8000,
      telefono: "9 1234 5678",
      estado: "agendado",
      abono: 10000,
      pagado: false,
    },
    {
      id: "3",
      fecha: new Date(2026, 0, 19),
      horaInicio: "12:00",
      cliente: "Ariel Vilxes",
      servicio: "Corte de cabello",
      duracion: 30,
      precio: -8000,
      telefono: "9 1234 5678",
      estado: "cancelado",
      abono: -10000,
      pagado: false,
    },
    {
      id: "4",
      fecha: new Date(2026, 0, 20),
      horaInicio: "13:00",
      cliente: "Manuel Garcia",
      servicio: "Corte de cabello",
      duracion: 30,
      precio: 8000,
      telefono: "9 1234 5678",
      estado: "reagendado",
      abono: 10000,
      pagado: false,
    },
    {
      id: "5",
      fecha: new Date(2025, 0, 20),
      horaInicio: "14:00",
      cliente: "Cristian Garcia",
      servicio: "lavado de cabello",
      duracion: 30,
      precio: 8000,
      telefono: "9 1234 5678",
      estado: "agendado",
      abono: 10000,
      pagado: false,
    }
  ]);

  /* ---------------- MES ---------------- */
  const monthMatrix = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startWeekDay = (firstDay.getDay() + 6) % 7;
    const matrix: (Date | null)[] = [];

    for (let i = 0; i < startWeekDay; i++) matrix.push(null);

    for (let d = 1; d <= lastDay.getDate(); d++) {
      matrix.push(new Date(year, month, d));
    }

    return matrix;
  }, [currentDate]);

  const goToNextMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const goToPreviousMonth = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  /* ---------------- SEMANA ---------------- */
  const weekDays = useMemo(() => {
    const date = selectedDate; // ✅ ya es Date
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    const monday = addDays(date, diff);

    return Array.from({ length: 7 }).map((_, i) =>
      addDays(monday, i)
    );
  }, [selectedDate]);


  const goToNextWeek = () =>
    setSelectedDate(addDays(selectedDate, 7));

  const goToPreviousWeek = () =>
    setSelectedDate(addDays(selectedDate, -7));

  /* ---------------- EVENTOS ---------------- */
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth()&&
    d1.getDate() === d2.getDate();

  const getEventosPorDia = (date: Date) => {
    return eventos.filter((e) => isSameDay(e.fecha, date));
  };

  /* ---------------- CARGAR DEL DIA ---------------- */
  const getCargaDelDia = (date: Date) => {
    const eventosDelDia = getEventosPorDia(date);
    const total = eventosDelDia.length;

    if (total === 0) return "libre";
    if (total <= 2) return "medio";
    return "lleno";
};

   const getIngresosDelDia = (date: Date) => {
    const eventosDelDia = getEventosPorDia(date);
    return eventosDelDia.reduce((total, evento) => total + evento.precio, 0);
   };

  const getPendientesDePago = (date: Date) => {
    const eventosDelDia = getEventosPorDia(date);
    return getEventosPorDia(date).filter(e => !e.pagado).length;
  };

  const isDiaAbierto = (date: Date) => {
    const day = date.getDay();
    return day !== 0; // cerrado el domingos
  };


  /* ---------------- BOTON DE ACTUALIZAR ---------------- */
  const updateEvento = (eventoActualizado: CalendarioEvento) => {
    setEventos((prev) => 
      prev.map((e) =>
        e.id === eventoActualizado.id ? eventoActualizado : e 
      )
    );
  };


  const getEstadoDelDia = (date: Date) => {
    const evts = getEventosPorDia(date);
    if (evts.length === 0) return null;

    if (evts.some((e) => e.estado === "cancelado")) return "cancelado";
    if (evts.some((e) => e.estado === "reagendado")) return "reagendado";
    if (evts.some((e) => e.estado === "confirmado")) return "confirmado";
    return "agendado";
  };

  const [eventoEditado, setEventoEditado] = useState<CalendarioEvento | null>(null);

  /* ---------------- VARIABLES DERIVADAS NUEVO CODIGO ---------------- */
  const puedeEditarPrecio = useMemo(() => {
    return !eventoEditado?.pagado;
  }, [eventoEditado]);

  const puedeEditarMetodoPago = useMemo(() => {
    return !eventoEditado?.pagado || eventoEditado?.estado === "agendado";
  }, [eventoEditado]);


  const modoReagendar = useMemo(() => {
    return eventoEditado?.estado === "reagendado";
  }, [eventoEditado]);

  return {
  currentDate,
  selectedDate,
  monthMatrix,
  weekDays,
  updateEvento,
  goToNextMonth,
  goToPreviousMonth,
  goToNextWeek,
  goToPreviousWeek,
  getEventosPorDia,
  getEstadoDelDia,
  getCargaDelDia,
  getIngresosDelDia,
  getPendientesDePago,
  isDiaAbierto,
  setSelectedDate,

  eventoEditado,
  setEventoEditado,
  puedeEditarPrecio,
  puedeEditarMetodoPago,
  modoReagendar,

    // DESPUES SE PUEDE USAR A FUTURO
    //getIngresosRealesDelDia
    //getIngresosProyectadosDelDia
  };
};

/* ---------------- HELPERS ---------------- */
const formatDate = (date: Date) =>
  date.toISOString().split("T")[0];

const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};
