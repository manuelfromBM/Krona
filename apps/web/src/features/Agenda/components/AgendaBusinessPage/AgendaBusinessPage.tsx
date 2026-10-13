"use client";

import { useMemo, useState } from "react";
import { CalendarClock, CircleDollarSign, ClipboardCheck, Users } from "lucide-react";
import { useAgenda } from "../../hooks/useAgenda";
import { mockBusinessAppointments } from "../../mock/mockAppointments";
import { AgendaFilters } from "../AgendaFilters/AgendaFilters";
import { AgendaStatsBar, type AgendaStatTile } from "../AgendaStatsBar/AgendaStatsBar";
import { AppointmentCard } from "../AppointmentCard/AppointmentCard";
import { EmptyAgendaState } from "../EmptyAgendaState/EmptyAgendaState";
import { formatPrice } from "../../utils/formatAgendaDate";
import type { AgendaTabKey } from "../../types/agenda.types";
import styles from "./AgendaBusinessPage.module.css";

const EMPTY_MESSAGES: Record<AgendaTabKey, string> = {
  proximas: "No hay citas próximas para el día seleccionado.",
  pendientes: "No hay solicitudes pendientes por confirmar.",
  pasadas: "No hay citas pasadas registradas.",
  canceladas: "No hay citas canceladas.",
};

const WEEKDAY_FMT = new Intl.DateTimeFormat("es-CL", { weekday: "short" });

function buildWeekStrip() {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      iso: date.toISOString().slice(0, 10),
      weekday: WEEKDAY_FMT.format(date).replace(".", ""),
      day: date.getDate(),
      isToday: i === 0,
    };
  });
}

export function AgendaBusinessPage() {
  const [appointments, setAppointments] = useState(mockBusinessAppointments);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const week = useMemo(buildWeekStrip, []);

  const { activeTab, setActiveTab, appointments: visible, counts, stats } =
    useAgenda(appointments);

  const filtered = selectedDate
    ? visible.filter((appointment) => appointment.date === selectedDate)
    : visible;

  function handleCancel(id: string) {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "cancelada" } : appointment,
      ),
    );
  }

  function handleConfirm(id: string) {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "confirmada" } : appointment,
      ),
    );
  }

  const tiles: AgendaStatTile[] = [
    { label: "Citas hoy", value: String(stats.todayCount), icon: CalendarClock, tone: "teal" },
    { label: "Por confirmar", value: String(stats.pendingCount), icon: Users, tone: "amber" },
    { label: "Confirmadas", value: String(stats.confirmedCount), icon: ClipboardCheck, tone: "teal" },
    { label: "Ingresos del período", value: formatPrice(stats.periodRevenue), icon: CircleDollarSign, tone: "slate" },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Agenda del negocio</h1>
          <p className={styles.subtitle}>
            Gestiona las reservas de tus clientes, confirma citas y revisa tu semana.
          </p>
        </div>
      </header>

      <AgendaStatsBar tiles={tiles} />

      <div className={styles.weekStrip} role="tablist" aria-label="Seleccionar día">
        <button
          type="button"
          className={`${styles.dayPill} ${selectedDate === null ? styles.dayPillActive : ""}`}
          onClick={() => setSelectedDate(null)}
        >
          Todos
        </button>
        {week.map((day) => (
          <button
            key={day.iso}
            type="button"
            className={`${styles.dayPill} ${selectedDate === day.iso ? styles.dayPillActive : ""}`}
            onClick={() => setSelectedDate((current) => (current === day.iso ? null : day.iso))}
          >
            <span className={styles.dayWeekday}>{day.weekday}</span>
            <span className={styles.dayNumber}>{day.day}</span>
            {day.isToday && <span className={styles.todayDot} aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div className={styles.toolbar}>
        <AgendaFilters active={activeTab} counts={counts} onChange={setActiveTab} />
      </div>

      <div className={styles.list}>
        {filtered.length === 0 ? (
          <EmptyAgendaState message={EMPTY_MESSAGES[activeTab]} />
        ) : (
          filtered.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              perspective="negocio"
              onCancel={handleCancel}
              onConfirm={handleConfirm}
            />
          ))
        )}
      </div>
    </div>
  );
}
