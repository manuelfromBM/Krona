// useDashboardPremiumCalendarioData.ts
import { useMemo, useState, useCallback } from "react";

// ─────────────────────────────────────────────
// TIPOS Y INTERFACES
// ─────────────────────────────────────────────

export type EstadoEvento =
  | "agendado"
  | "confirmado"
  | "reagendado"
  | "cancelado";

export type CargaDia = "libre" | "medio" | "lleno"; // ← exportado para CalendarView

export type MetodoPago =
  | "efectivo"
  | "tarjeta"
  | "transferencia"
  | "credito";

export interface CalendarioEvento {
  id: string;

  // Tiempo
  fecha: Date;
  horaInicio: string;
  duracion: number; // en minutos

  // Cliente
  cliente: string;
  telefono?: string;

  // Servicio
  servicio: string;
  tipoServicio?: string;

  // Estado
  estado: EstadoEvento;

  // Financiero — precio SIEMPRE positivo
  // el hook se encarga de filtrar cancelados
  pagado: boolean;
  precio: number;
  abono: number;
  metodoPago?: MetodoPago;

  // Opcionales
  calificacion?: number;
  observaciones?: string;
}

// Configuración del negocio — preparado para ser
// dinámico cuando se conecte con la API
export interface ConfigNegocio {
  diasCerrados: number[];   // 0=Dom, 1=Lun ... 6=Sáb
  horaApertura: string;     // "09:00"
  horaCierre: string;       // "19:00"
  metaMensual: number;
  duracionDefaultMinutos: number;
}

const CONFIG_DEFAULT: ConfigNegocio = {
  diasCerrados: [0],         // Solo domingos cerrado
  horaApertura: "09:00",
  horaCierre: "19:00",
  metaMensual: 500000,
  duracionDefaultMinutos: 30,
};

// ─────────────────────────────────────────────
// HELPERS — fuera del hook para no recrearlos
// ─────────────────────────────────────────────

export const addDays = (date: Date, days: number): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const formatDate = (date: Date): string =>
  date.toISOString().split("T")[0];

export const isSameDay = (d1: Date, d2: Date): boolean =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

const toMinutes = (hora: string): number => {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
};

// ─────────────────────────────────────────────
// EVENTOS MOCK
// TODO: reemplazar con fetch a la API cuando esté lista
// ─────────────────────────────────────────────

const EVENTOS_INICIALES: CalendarioEvento[] = [
  {
    id: "1",
    fecha: new Date(2026, 3, 17),
    horaInicio: "10:00",
    duracion: 30,
    cliente: "Juan Pérez",
    telefono: "9 1234 5678",
    servicio: "Corte de cabello",
    estado: "confirmado",
    pagado: true,
    precio: 10000,  // ✅ siempre positivo
    abono: 8000,
    metodoPago: "efectivo",
  },
  {
    id: "2",
    fecha: new Date(2026, 3, 18),
    horaInicio: "11:00",
    duracion: 30,
    cliente: "Matias Palma",
    telefono: "9 1234 5678",
    servicio: "Corte de cabello",
    estado: "agendado",
    pagado: false,
    precio: 8000,
    abono: 0,
  },
  {
    id: "3",
    fecha: new Date(2026, 3, 19),
    horaInicio: "12:00",
    duracion: 30,
    cliente: "Ariel Vilches",
    telefono: "9 1234 5678",
    servicio: "Corte de cabello",
    estado: "cancelado",
    pagado: false,
    precio: 8000,  // ✅ positivo — el hook filtra cancelados al calcular
    abono: 0,      // ✅ abono 0 en cancelados
  },
  {
    id: "4",
    fecha: new Date(2026, 3, 20),
    horaInicio: "13:00",
    duracion: 30,
    cliente: "Manuel Garcia",
    telefono: "9 1234 5678",
    servicio: "Corte de cabello",
    estado: "reagendado",
    pagado: false,
    precio: 8000,
    abono: 0,
  },
  {
    id: "5",
    fecha: new Date(2026, 3, 20),
    horaInicio: "14:00",
    duracion: 30,
    cliente: "Cristian Garcia",
    telefono: "9 1234 5678",
    servicio: "Lavado de cabello",
    estado: "agendado",
    pagado: false,
    precio: 8000,
    abono: 0,
  },
];

// ─────────────────────────────────────────────
// HOOK PRINCIPAL
// ─────────────────────────────────────────────

export const useDashboardPremiumCalendarioData = (
  config: ConfigNegocio = CONFIG_DEFAULT
) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventos, setEventos] = useState<CalendarioEvento[]>(EVENTOS_INICIALES);

  // ─────────────────────────────────────────
  // MATRIZ DEL MES
  // ─────────────────────────────────────────
  const monthMatrix = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekDay = (firstDay.getDay() + 6) % 7; // Lunes = 0
    const matrix: (Date | null)[] = [];

    for (let i = 0; i < startWeekDay; i++) matrix.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) {
      matrix.push(new Date(year, month, d));
    }

    return matrix;
  }, [currentDate]);

  // ─────────────────────────────────────────
  // DÍAS DE LA SEMANA
  // ─────────────────────────────────────────
  const weekDays = useMemo(() => {
    const day = selectedDate.getDay();
    const diff = day === 0 ? -6 : 1 - day; // Lunes = inicio
    const monday = addDays(selectedDate, diff);
    return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
  }, [selectedDate]);

  // ─────────────────────────────────────────
  // NAVEGACIÓN — useCallback evita recrear
  // funciones en cada render
  // ─────────────────────────────────────────
  const goToNextMonth = useCallback(() =>
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1)),
  []);

  const goToPreviousMonth = useCallback(() =>
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1)),
  []);

  const goToNextWeek = useCallback(() =>
    setSelectedDate((d) => addDays(d, 7)),
  []);

  const goToPreviousWeek = useCallback(() =>
    setSelectedDate((d) => addDays(d, -7)),
  []);

  // ─────────────────────────────────────────
  // QUERIES DE EVENTOS
  // ─────────────────────────────────────────
  const getEventosPorDia = useCallback((date: Date): CalendarioEvento[] =>
    eventos.filter((e) => isSameDay(e.fecha, date)),
  [eventos]);

  const getEstadoDelDia = useCallback((date: Date): EstadoEvento | null => {
    const evts = getEventosPorDia(date);
    if (evts.length === 0) return null;
    // Prioridad: cancelado > reagendado > confirmado > agendado
    if (evts.some((e) => e.estado === "cancelado")) return "cancelado";
    if (evts.some((e) => e.estado === "reagendado")) return "reagendado";
    if (evts.some((e) => e.estado === "confirmado")) return "confirmado";
    return "agendado";
  }, [getEventosPorDia]);

  const getCargaDelDia = useCallback((date: Date): CargaDia => {
    const total = getEventosPorDia(date).length;
    if (total === 0) return "libre";
    if (total <= 2) return "medio";
    return "lleno";
  }, [getEventosPorDia]);

  const getIngresosDelDia = useCallback((date: Date): number =>
    getEventosPorDia(date)
      .filter((e) => e.estado !== "cancelado") // ← solo eventos activos
      .reduce((acc, e) => acc + e.precio, 0),
  [getEventosPorDia]);

  const getPendientesDePago = useCallback((date: Date): number =>
    getEventosPorDia(date)
      .filter((e) => !e.pagado && e.estado !== "cancelado")
      .length,
  [getEventosPorDia]);

  // ─────────────────────────────────────────
  // DISPONIBILIDAD
  // ─────────────────────────────────────────

  // Usa config en lugar de hardcodear días cerrados
  const isDiaAbierto = useCallback((date: Date): boolean =>
    !config.diasCerrados.includes(date.getDay()),
  [config.diasCerrados]);

  // Ya no recibe eventos como parámetro — usa el estado interno
  const getHorasDisponibles = useCallback((
    date: Date,
    horaSlots: string[]
  ): string[] => {
    const eventosDelDia = getEventosPorDia(date);
    return horaSlots.filter((hora) => {
      const horaMins = toMinutes(hora);
      // Verifica que la hora no esté dentro de ningún evento activo
      return !eventosDelDia.some((e) => {
        if (e.estado === "cancelado") return false;
        const inicio = toMinutes(e.horaInicio);
        const fin = inicio + e.duracion;
        return horaMins >= inicio && horaMins < fin;
      });
    });
  }, [getEventosPorDia]);

  // ─────────────────────────────────────────
  // MUTACIONES
  // ─────────────────────────────────────────
  const updateEvento = useCallback((eventoActualizado: CalendarioEvento) => {
    setEventos((prev) =>
      prev.map((e) =>
        e.id === eventoActualizado.id ? eventoActualizado : e
      )
    );
  }, []);

  // Agregar evento nuevo con ID autogenerado
  // TODO: conectar con API cuando esté lista
  const addEvento = useCallback((
    evento: Omit<CalendarioEvento, "id">
  ) => {
    const nuevoEvento: CalendarioEvento = {
      ...evento,
      id: `local-${Date.now()}`, // temporal hasta tener API
    };
    setEventos((prev) => [...prev, nuevoEvento]);
  }, []);

  // Eliminar evento por ID
  // TODO: conectar con API cuando esté lista
  const deleteEvento = useCallback((id: string) => {
    setEventos((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // ─────────────────────────────────────────
  // RETORNO
  // ─────────────────────────────────────────
  return {
    // Estado
    currentDate,
    selectedDate,
    eventos,

    // Calendario
    monthMatrix,
    weekDays,

    // Navegación
    goToNextMonth,
    goToPreviousMonth,
    goToNextWeek,
    goToPreviousWeek,
    setSelectedDate,

    // Queries
    getEventosPorDia,
    getEstadoDelDia,
    getCargaDelDia,
    getIngresosDelDia,
    getPendientesDePago,
    isDiaAbierto,
    getHorasDisponibles,

    // Mutaciones
    updateEvento,
    addEvento,    // 🆕
    deleteEvento, // 🆕

    // Config expuesta — útil para mostrar horarios en UI
    config,

    // ── Para uso futuro ──────────────────────
    // getIngresosRealesDelDia
    // getIngresosProyectadosDelDia
    // syncConAPI
  };
};