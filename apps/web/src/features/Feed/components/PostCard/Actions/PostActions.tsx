import { Bookmark, CalendarCheck, Heart, MessageCircle, Send } from "lucide-react";

import styles from "../PostCard.module.css";

interface PostActionsProps {
  liked: boolean;
  likes: number;
  saved: boolean;
  reserved: boolean;
  commentsOpen: boolean;
  commentsTotal: number;
  commentsPanelId: string;
  shareOpen: boolean;
  sharePanelId: string;
  onToggleLike: () => void;
  onToggleComments: () => void;
  onToggleShare: () => void;
  onToggleSave: () => void;
  onReserve: () => void;
  showReserve?: boolean;
}

export function PostActions(props: PostActionsProps) {
  return (
    <div className={styles.reactions}>
      <button type="button" className={`${styles.reactBtn} ${props.liked ? styles.liked : ""}`} onClick={props.onToggleLike} aria-label="Me gusta">
        <Heart size={22} fill={props.liked ? "#e05252" : "none"} /><span>{props.likes}</span>
      </button>
      <button type="button" className={styles.reactBtn} onClick={props.onToggleComments} aria-label={props.commentsOpen ? "Cerrar comentarios" : "Abrir comentarios"} aria-expanded={props.commentsOpen} aria-controls={props.commentsPanelId}>
        <MessageCircle size={22} /><span>{props.commentsTotal}</span>
      </button>
      <button type="button" className={`${styles.reactBtn} ${props.shareOpen ? styles.shareActive : ""}`} onClick={props.onToggleShare} aria-label="Compartir" aria-expanded={props.shareOpen} aria-controls={props.sharePanelId}>
        <Send size={20} />
      </button>
      <button type="button" className={`${styles.saveBtn} ${props.saved ? styles.saved : ""}`} onClick={props.onToggleSave} aria-label="Guardar publicación" aria-pressed={props.saved}>
        <Bookmark size={18} fill={props.saved ? "currentColor" : "none"} /><span>{props.saved ? "Guardado" : "Guardar"}</span>
      </button>
      {props.showReserve !== false && (
        <button type="button" className={`${styles.reserveBtn} ${props.reserved ? styles.reserved : ""}`} onClick={props.onReserve} aria-label="Reservar" aria-pressed={props.reserved}>
          <CalendarCheck size={18} /><span>{props.reserved ? "Reservado" : "Reservar"}</span>
        </button>
      )}
    </div>
  );
}