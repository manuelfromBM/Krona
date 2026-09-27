"use client";

import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, Clock, X } from "lucide-react";

import styles from "./ReservationModal.module.css";

interface ReservationModalProps {
  businessName: string;
  onClose: () => void;
  onConfirm: (date: string, time: string) => void;
}

// Fechas y horarios mock. Más adelante pueden venir desde el backend.
const AVAILABLE_DATES = ["Jue 3 Sep", "Vie 4 Sep", "Sáb 5 Sep", "Lun 7 Sep"];
const AVAILABLE_TIMES = ["09:00", "10:30", "12:00", "15:00", "16:30", "18:00"];

export default function ReservationModal({ businessName, onClose, onConfirm }: ReservationModalProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Permite cerrar la ventana con Escape.
  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div className={styles.titleIcon}><CalendarDays size={21} /></div>
          <div>
            <h2 id="reservation-title">Agendar una cita</h2>
            <p>{businessName}</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Cerrar reserva">
            <X size={20} />
          </button>
        </header>

        {/* Selección de fechas que están disponibles. */}
        <div className={styles.section}>
          <h3><CalendarDays size={16} /> Selecciona una fecha disponible</h3>
          <div className={styles.optionsGrid}>
            {AVAILABLE_DATES.map((date) => (
              <button
                key={date}
                type="button"
                className={selectedDate === date ? styles.selected : ""}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime("");
                }}
                aria-pressed={selectedDate === date}
              >
                {date}
              </button>
            ))}
          </div>
        </div>

        {/* Los horarios aparecen después de elegir una fecha. */}
        <div className={styles.section}>
          <h3><Clock size={16} /> Selecciona una hora</h3>
          {selectedDate ? (
            <div className={styles.optionsGrid}>
              {AVAILABLE_TIMES.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={selectedTime === time ? styles.selected : ""}
                  onClick={() => setSelectedTime(time)}
                  aria-pressed={selectedTime === time}
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <p className={styles.helper}>Primero selecciona una fecha.</p>
          )}
        </div>

        <button
          type="button"
          className={styles.confirmBtn}
          disabled={!selectedDate || !selectedTime}
          onClick={() => onConfirm(selectedDate, selectedTime)}
        >
          <CheckCircle2 size={18} /> Agendar
        </button>
      </section>
    </div>
  );
}
