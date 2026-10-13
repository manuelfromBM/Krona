"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarCheck2, CalendarClock, Sparkles, Wallet } from "lucide-react";
import { useAgenda } from "../../hooks/useAgenda";
import { mockClientAppointments } from "../../mock/mockAppointments";
import { AgendaFilters } from "../AgendaFilters/AgendaFilters";
import { AgendaStatsBar, type AgendaStatTile } from "../AgendaStatsBar/AgendaStatsBar";
import { AppointmentCard } from "../AppointmentCard/AppointmentCard";
import { EmptyAgendaState } from "../EmptyAgendaState/EmptyAgendaState";
import { formatPrice } from "../../utils/formatAgendaDate";
import type { AgendaTabKey } from "../../types/agenda.types";
import styles from "./AgendaClientPage.module.css";

const EMPTY_MESSAGES: Record<AgendaTabKey, string> = {
  proximas: "No tienes citas próximas. ¡Explora servicios y agenda una!",
  pendientes: "No tienes solicitudes pendientes de confirmación.",
  pasadas: "Aún no registras citas pasadas.",
  canceladas: "No tienes citas canceladas.",
};

export function AgendaClientPage() {
  const [appointments, setAppointments] = useState(mockClientAppointments);
  const { activeTab, setActiveTab, appointments: visible, counts, stats } =
    useAgenda(appointments);

  function handleCancel(id: string) {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "cancelada" } : appointment,
      ),
    );
  }

  const tiles: AgendaStatTile[] = [
    { label: "Citas hoy", value: String(stats.todayCount), icon: CalendarClock, tone: "teal" },
    { label: "Pendientes", value: String(stats.pendingCount), icon: Sparkles, tone: "amber" },
    { label: "Confirmadas", value: String(stats.confirmedCount), icon: CalendarCheck2, tone: "teal" },
    { label: "Gasto del período", value: formatPrice(stats.periodRevenue), icon: Wallet, tone: "slate" },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Mi agenda</h1>
          <p className={styles.subtitle}>
            Revisa tus próximas citas, confirma asistencia o cancela con anticipación.
          </p>
        </div>
        <Link href="/feed" className={styles.cta}>
          + Reservar un servicio
        </Link>
      </header>

      <AgendaStatsBar tiles={tiles} />

      <div className={styles.toolbar}>
        <AgendaFilters active={activeTab} counts={counts} onChange={setActiveTab} />
      </div>

      <div className={styles.list}>
        {visible.length === 0 ? (
          <EmptyAgendaState message={EMPTY_MESSAGES[activeTab]} />
        ) : (
          visible.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              perspective="cliente"
              onCancel={handleCancel}
            />
          ))
        )}
      </div>
    </div>
  );
}
