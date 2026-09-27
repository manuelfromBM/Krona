import { CheckCircle2 } from "lucide-react";

import styles from "../PostCard.module.css";

export function ReservationToast({ message }: { message: string }) {
  return (
    <div className={styles.reservationToast} role="status" aria-live="polite">
      <CheckCircle2 size={19} />
      <div><strong>Cita agendada</strong><span>{message}</span></div>
    </div>
  );
}
