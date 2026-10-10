"use client";

import Image from "next/image";
import { CalendarDays, Clock, UserRound, X } from "lucide-react";
import type { Appointment } from "../../types/agenda.types";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import { formatAgendaDate, formatPrice } from "../../utils/formatAgendaDate";
import styles from "./AppointmentCard.module.css";

interface AppointmentCardProps {
  appointment: Appointment;
  perspective: "cliente" | "negocio";
  onCancel?: (id: string) => void;
  onConfirm?: (id: string) => void;
}

export function AppointmentCard({
  appointment,
  perspective,
  onCancel,
  onConfirm,
}: AppointmentCardProps) {
  const party = perspective === "cliente" ? appointment.business : appointment.client;
  const canCancel =
    appointment.status === "pendiente" || appointment.status === "confirmada";
  const canConfirm = perspective === "negocio" && appointment.status === "pendiente";

  return (
    <article className={styles.card}>
      <div className={styles.avatar}>
        {party.avatar ? (
          <Image src={party.avatar} alt={party.name} width={44} height={44} />
        ) : (
          <span>{party.name.slice(0, 2).toUpperCase()}</span>
        )}
      </div>

      <div className={styles.main}>
        <div className={styles.topRow}>
          <p className={styles.service}>{appointment.service}</p>
          <StatusBadge status={appointment.status} />
        </div>

        <p className={styles.party}>
          {party.name}
          {appointment.employeeName ? ` · ${appointment.employeeName}` : ""}
        </p>

        <div className={styles.meta}>
          <span>
            <CalendarDays size={13} /> {formatAgendaDate(appointment.date)}
          </span>
          <span>
            <Clock size={13} /> {appointment.time} · {appointment.durationMinutes} min
          </span>
          <span className={styles.price}>{formatPrice(appointment.price)}</span>
        </div>

        {appointment.notes && <p className={styles.notes}>{appointment.notes}</p>}
      </div>

      {(canCancel || canConfirm) && (
        <div className={styles.actions}>
          {canConfirm && (
            <button
              type="button"
              className={styles.confirmBtn}
              onClick={() => onConfirm?.(appointment.id)}
            >
              <UserRound size={13} /> Confirmar
            </button>
          )}
          {canCancel && (
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => onCancel?.(appointment.id)}
            >
              <X size={13} /> Cancelar
            </button>
          )}
        </div>
      )}
    </article>
  );
}
