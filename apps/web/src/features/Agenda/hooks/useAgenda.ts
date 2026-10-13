"use client";

import { useMemo, useState } from "react";
import type {
  AgendaStats,
  AgendaTabKey,
  Appointment,
} from "../types/agenda.types";

function toDateTime(appointment: Appointment): Date {
  return new Date(`${appointment.date}T${appointment.time}:00`);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function matchesTab(appointment: Appointment, tab: AgendaTabKey, now: Date): boolean {
  const start = toDateTime(appointment);
  const isFuture = start.getTime() >= now.getTime();

  switch (tab) {
    case "proximas":
      return isFuture && appointment.status !== "cancelada";
    case "pendientes":
      return appointment.status === "pendiente";
    case "pasadas":
      return (
        !isFuture &&
        (appointment.status === "completada" || appointment.status === "confirmada")
      );
    case "canceladas":
      return appointment.status === "cancelada";
    default:
      return true;
  }
}

export function useAgenda(appointments: Appointment[]) {
  const [activeTab, setActiveTab] = useState<AgendaTabKey>("proximas");

  const now = useMemo(() => new Date(), []);

  const visibleAppointments = useMemo(() => {
    return appointments
      .filter((appointment) => matchesTab(appointment, activeTab, now))
      .sort((a, b) => toDateTime(a).getTime() - toDateTime(b).getTime());
  }, [appointments, activeTab, now]);

  const counts = useMemo(() => {
    const result: Record<AgendaTabKey, number> = {
      proximas: 0,
      pendientes: 0,
      pasadas: 0,
      canceladas: 0,
    };

    (Object.keys(result) as AgendaTabKey[]).forEach((tab) => {
      result[tab] = appointments.filter((appointment) =>
        matchesTab(appointment, tab, now),
      ).length;
    });

    return result;
  }, [appointments, now]);

  const stats: AgendaStats = useMemo(() => {
    const todayCount = appointments.filter(
      (appointment) =>
        isSameDay(toDateTime(appointment), now) &&
        appointment.status !== "cancelada",
    ).length;

    const pendingCount = appointments.filter(
      (appointment) => appointment.status === "pendiente",
    ).length;

    const confirmedCount = appointments.filter(
      (appointment) => appointment.status === "confirmada",
    ).length;

    const periodRevenue = appointments
      .filter((appointment) =>
        ["confirmada", "completada"].includes(appointment.status),
      )
      .reduce((sum, appointment) => sum + appointment.price, 0);

    return { todayCount, pendingCount, confirmedCount, periodRevenue };
  }, [appointments, now]);

  return {
    activeTab,
    setActiveTab,
    appointments: visibleAppointments,
    counts,
    stats,
  };
}
