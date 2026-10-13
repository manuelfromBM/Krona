import type { AppointmentStatus } from "../../types/agenda.types";
import styles from "./StatusBadge.module.css";

const LABELS: Record<AppointmentStatus, string> = {
  confirmada: "Confirmada",
  pendiente: "Pendiente",
  cancelada: "Cancelada",
  completada: "Completada",
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {LABELS[status]}
    </span>
  );
}
