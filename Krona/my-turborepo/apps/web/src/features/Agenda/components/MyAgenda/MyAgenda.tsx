"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, UserRound } from "lucide-react";

import styles from "./MyAgenda.module.css";
import type { AgendaItem } from "../../types/agenda.types";

interface MyAgendaProps {
  appointments: AgendaItem[];
}

type AgendaTab = "proximas" | "reservas" | "pasadas";

export const MyAgenda = ({ appointments }: MyAgendaProps) => {
  const [activeTab, setActiveTab] = useState<AgendaTab>("proximas");

  // CONTROLA SI LA AGENDA ESTÁ ABIERTA O CONTRAÍDA.
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className={`${styles.card} ${!isOpen ? styles.collapsed : ""}`}>
      {/* CABECERA: permanece visible incluso cuando la agenda está cerrada. */}
      <div className={styles.header}>
        <h3 className={styles.title}>Mi agenda</h3>
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="my-agenda-content"
        >
          {isOpen ? "Cerrar" : "Abrir"}
          {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>

      {/* El contenido aparece hacia abajo al presionar Abrir. */}
      {isOpen && (
        <div id="my-agenda-content" className={styles.content}>
          {/* PESTAÑAS DE LA AGENDA */}
          <div className={styles.tabs} role="tablist" aria-label="Secciones de agenda">
            {(["proximas", "reservas", "pasadas"] as AgendaTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
              >
                {tab === "proximas" ? "Próximas" : tab === "reservas" ? "Reservas" : "Pasadas"}
              </button>
            ))}
          </div>

          {/* RESERVAS PRÓXIMAS CON FOTO, SERVICIO, FECHA, HORA Y NEGOCIO. */}
          <div className={styles.list}>
            {activeTab === "proximas" && appointments.slice(0, 3).map((appointment) => (
              <article key={appointment.id} className={styles.item}>
                <div className={styles.avatar}>
                  {appointment.avatar ? (
                    <Image
                      src={appointment.avatar}
                      alt={appointment.businessName ?? appointment.service}
                      width={38}
                      height={38}
                    />
                  ) : (
                    <span>{appointment.clientName.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>

                <div className={styles.info}>
                  <p>{appointment.service}</p>
                  <span>{appointment.date} · {appointment.time}</span>
                  <small>{appointment.businessName ?? appointment.clientName}</small>
                </div>

                <UserRound size={18} className={styles.userIcon} aria-hidden="true" />
              </article>
            ))}

            {activeTab === "reservas" && (
              <div className={styles.empty}>Todas tus reservas aparecerán aquí.</div>
            )}
            {activeTab === "pasadas" && (
              <div className={styles.empty}>Tus reservas pasadas aparecerán aquí.</div>
            )}
          </div>

          {/* Solo visual: la navegación será implementada por otro integrante. */}
          <div className={styles.footer}>
            <button type="button" className={styles.viewAll}>
              Ver todas mis reservas <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
