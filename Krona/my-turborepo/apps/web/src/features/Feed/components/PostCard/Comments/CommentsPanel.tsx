import type { FormEvent } from "react";
import Image from "next/image";

import styles from "../PostCard.module.css";
import type { PostComment } from "../../../types/post.types";

interface CommentsPanelProps {
  id: string;
  initialCount: number;
  initialComments?: PostComment[];
  comments: string[];
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function CommentsPanel({ id, initialCount, initialComments, comments, draft, onDraftChange, onSubmit }: CommentsPanelProps) {
  return (
    <section id={id} className={styles.commentsPanel} aria-label="Comentarios de la publicación">
      {initialComments?.length ? (
        <div className={styles.commentsList}>
          {initialComments.map((comment) => (
            <article key={comment.id} className={styles.commentRow}>
              <Image src={comment.avatar} alt={`Foto de ${comment.username}`} width={32} height={32} className={styles.commentAvatar} />
              <div className={styles.commentContent}>
                <p className={styles.commentItem}><strong>{comment.username}</strong> {comment.text}</p>
                <button type="button" className={styles.replyBtn}>Responder</button>
              </div>
              <time className={styles.commentTime}>{comment.createdAt}</time>
            </article>
          ))}
        </div>
      ) : initialCount > 0 ? (
        <p className={styles.commentsSummary}>Esta publicación tiene {initialCount} comentarios.</p>
      ) : null}

      {comments.length > 0 && (
        <div className={styles.commentsList} aria-live="polite">
          {comments.map((text, index) => (
            <article key={`${text}-${index}`} className={styles.commentRow}>
              <span className={styles.currentUserAvatar}>TÚ</span>
              <div className={styles.commentContent}>
                <p className={styles.commentItem}><strong>Tú</strong> {text}</p>
                <button type="button" className={styles.replyBtn}>Responder</button>
              </div>
              <time className={styles.commentTime}>Ahora</time>
            </article>
          ))}
        </div>
      )}

      <form className={styles.commentForm} onSubmit={onSubmit}>
        <input type="text" value={draft} onChange={(event) => onDraftChange(event.target.value)} placeholder="Añade un comentario..." aria-label="Nuevo comentario" />
        <button type="submit" className={styles.publishBtn} disabled={!draft.trim()}>Publicar</button>
      </form>
    </section>
  );
}
