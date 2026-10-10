import { CalendarX } from "lucide-react";
import styles from "./EmptyAgendaState.module.css";

export function EmptyAgendaState({ message }: { message: string }) {
  return (
    <div className={styles.empty}>
      <CalendarX size={28} />
      <p>{message}</p>
    </div>
  );
}
