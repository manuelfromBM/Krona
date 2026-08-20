"use client";

import { useState } from "react";

import styles from "./MyAgenda.module.css";

import type { AgendaItem } from "../../types/agenda.types";
import { mock } from "node:test";

interface MyAgendaProps {
  appointments: AgendaItem[];
}

type AgendaTab = "proximas" | "reservas" | "pasadas";

export const MyAgenda = ({
  appointments,
}: MyAgendaProps) => {
  const [activeTab, setActiveTab] =
    useState<AgendaTab>("proximas");

  return (
    <section className={styles.card}>
      {/* CABECERA */}
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>
            AGENDA
          </span>

          <h3 className={styles.title}>
            Mi agenda
          </h3>
        </div>

        <button
          type="button"
          className={styles.closeBtn}
        >
          Cerrar
        </button>
      </div>

      {/* TABS */}
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${
            activeTab === "proximas"
              ? styles.activeTab
              : ""
          }`}
          onClick={() =>
            setActiveTab("proximas")
          }
        >
          Próximas
        </button>

        <button
          type="button"
          className={`${styles.tab} ${
            activeTab === "reservas"
              ? styles.activeTab
              : ""
          }`}
          onClick={() =>
            setActiveTab("reservas")
          }
        >
          Reservas
        </button>

        <button
          type="button"
          className={`${styles.tab} ${
            activeTab === "pasadas"
              ? styles.activeTab
              : ""
          }`}
          onClick={() =>
            setActiveTab("pasadas")
          }
        >
          Pasadas
        </button>
      </div>

      {/* CONTENIDO */}
      <div className={styles.list}>
        {activeTab === "proximas" &&
          appointments
            .slice(0, 3)
            .map((appointment) => (
              <div
                key={appointment.id}
                className={styles.item}
              >
                <div className={styles.time}>
                  {appointment.time}
                </div>

                <div className={styles.info}>
                  <p>
                    {appointment.clientName}
                  </p>

                  <span>
                    {appointment.service}
                  </span>
                </div>

                <span
                  className={`${styles.status} ${
                    styles[appointment.status]
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            ))}

        {activeTab === "reservas" && (
          <div className={styles.empty}>
            <p>
              Todas tus reservas aparecerán
              aquí.
            </p>
          </div>
        )}

        {activeTab === "pasadas" && (
          <div className={styles.empty}>
            <p>
              Tus reservas pasadas aparecerán
              aquí.
            </p>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.viewAll}
        >
          Ver todas mis reservas →
        </button>
      </div>
    </section>
  );
};