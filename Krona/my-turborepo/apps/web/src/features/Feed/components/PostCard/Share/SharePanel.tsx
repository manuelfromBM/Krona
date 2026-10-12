import styles from "../PostCard.module.css";

interface SharePanelProps {
  id: string;
  message: string;
  onSelect: (option: string) => void;
}

export function SharePanel({ id, message, onSelect }: SharePanelProps) {
  return (
    <section id={id} className={styles.sharePanel} aria-label="Opciones para compartir">
      <strong>Compartir publicación</strong>
      <div className={styles.shareOptions}>
        {["Copiar enlace", "WhatsApp", "Mensaje directo"].map((option) => (
          <button key={option} type="button" onClick={() => onSelect(option)}>{option}</button>
        ))}
      </div>
      {message && <p className={styles.shareMessage} role="status">{message}</p>}
    </section>
  );
}
