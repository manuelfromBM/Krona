"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, MessageCircle, X } from "lucide-react";

import styles from "./StoryModal.module.css";
import type { Story } from "../../../types/story.types";

interface StoryModalProps {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
  onSeen: (id: string) => void;
}

const SLIDE_DURATION = 5000;
const LIKES_KEY = "krona-story-likes";
const COMMENTS_KEY = "krona-story-comments";

export default function StoryModal({ stories, initialIndex, onClose, onSeen }: StoryModalProps) {
  const [storyIdx, setStoryIdx] = useState(initialIndex);
  const [slideIdx, setSlideIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // INTERACCIONES GUARDADAS POR CADA HISTORIA.
  const [likedStories, setLikedStories] = useState<Record<string, boolean>>({});
  const [commentsByStory, setCommentsByStory] = useState<Record<string, string[]>>({});
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const current = stories[storyIdx];
  const currentStoryId = current?.id;
  const totalSlides = current?.slides.length ?? 0;
  const slide = current?.slides[slideIdx];
  const currentComments = current ? commentsByStory[current.id] ?? [] : [];
  const liked = current ? Boolean(likedStories[current.id]) : false;

  // La historia se pausa al abrir comentarios o escribir, como en Instagram.
  const isPaused = showComments || inputFocused;

  const nextSlide = useCallback(() => {
    if (slideIdx < totalSlides - 1) {
      setSlideIdx((value) => value + 1);
    } else if (storyIdx < stories.length - 1) {
      setStoryIdx((value) => value + 1);
      setSlideIdx(0);
      setShowComments(false);
      setComment("");
    } else {
      onClose();
    }
  }, [slideIdx, storyIdx, totalSlides, stories.length, onClose]);

  const prevSlide = useCallback(() => {
    if (slideIdx > 0) {
      setSlideIdx((value) => value - 1);
    } else if (storyIdx > 0) {
      setStoryIdx((value) => value - 1);
      setSlideIdx(0);
      setShowComments(false);
      setComment("");
    }
  }, [slideIdx, storyIdx]);

  // RECUPERA LIKES Y COMENTARIOS AL VOLVER A CARGAR LA PÁGINA.
  useEffect(() => {
    try {
      setLikedStories(JSON.parse(localStorage.getItem(LIKES_KEY) ?? "{}"));
      setCommentsByStory(JSON.parse(localStorage.getItem(COMMENTS_KEY) ?? "{}"));
    } catch {
      setLikedStories({});
      setCommentsByStory({});
    }
  }, []);

  // MARCA LA HISTORIA COMO VISTA AL ABRIRLA.
  useEffect(() => {
    // Depende del ID, no del objeto completo, para evitar un ciclo de actualizaciones.
    if (currentStoryId) onSeen(currentStoryId);
  }, [currentStoryId, onSeen]);

  // Reinicia el progreso solamente al cambiar de historia o slide.
  useEffect(() => {
    progressRef.current = 0;
    setProgress(0);
  }, [storyIdx, slideIdx]);

  // TEMPORIZADOR CON PAUSA REAL.
  useEffect(() => {
    if (isPaused || !current) return;

    const interval = window.setInterval(() => {
      progressRef.current += (50 / SLIDE_DURATION) * 100;

      if (progressRef.current >= 100) {
        window.clearInterval(interval);
        setProgress(100);
        nextSlide();
        return;
      }

      setProgress(progressRef.current);
    }, 50);

    return () => window.clearInterval(interval);
  }, [current, isPaused, nextSlide]);

  // También pausa el video mientras el usuario comenta.
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPaused) videoRef.current.pause();
    else void videoRef.current.play().catch(() => undefined);
  }, [isPaused, slide]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (!isPaused && event.key === "ArrowRight") nextSlide();
      if (!isPaused && event.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isPaused, nextSlide, prevSlide, onClose]);

  function toggleLike() {
    if (!current) return;
    setLikedStories((previous) => {
      const updated = { ...previous, [current.id]: !previous[current.id] };
      localStorage.setItem(LIKES_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function publishComment() {
    if (!current || !comment.trim()) return;
    setCommentsByStory((previous) => {
      const updated = {
        ...previous,
        [current.id]: [...(previous[current.id] ?? []), comment.trim()],
      };
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(updated));
      return updated;
    });
    setComment("");
    setShowComments(true);
  }

  if (!current) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.progressBar}>
          {current.slides.map((_, index) => (
            <div key={index} className={styles.segment}>
              <div
                className={styles.fill}
                style={{
                  width: index < slideIdx ? "100%" : index === slideIdx ? `${progress}%` : "0%",
                }}
              />
            </div>
          ))}
        </div>

        <div className={styles.header}>
          <div className={styles.avatar}>
            {current.avatar ? (
              <Image src={current.avatar} alt={current.username} fill style={{ objectFit: "cover" }} />
            ) : (
              <span>{current.initials}</span>
            )}
          </div>
          <div>
            <p className={styles.username}>{current.username}</p>
            <p className={styles.time}>{current.time}{isPaused ? " · Pausada" : ""}</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {slide?.type === "image" && (
            <Image src={slide.url} alt={`Historia de ${current.username}`} fill priority style={{ objectFit: "cover" }} />
          )}
          {slide?.type === "video" && (
            <video ref={videoRef} src={slide.url} className={styles.video} autoPlay muted playsInline />
          )}
        </div>

        <button type="button" className={`${styles.navBtn} ${styles.left}`} onClick={prevSlide} aria-label="Anterior">
          <ChevronLeft size={24} />
        </button>
        <button type="button" className={`${styles.navBtn} ${styles.right}`} onClick={nextSlide} aria-label="Siguiente">
          <ChevronRight size={24} />
        </button>

        <div className={styles.footer}>
          <button type="button" className={`${styles.actionBtn} ${liked ? styles.liked : ""}`} onClick={toggleLike} aria-label="Me gusta" aria-pressed={liked}>
            <Heart size={22} fill={liked ? "#e05252" : "none"} color={liked ? "#e05252" : "#fff"} />
          </button>
          <button type="button" className={styles.actionBtn} onClick={() => setShowComments((value) => !value)} aria-label="Ver comentarios" aria-expanded={showComments}>
            <MessageCircle size={22} color="#fff" />
            <span>{currentComments.length || ""}</span>
          </button>

          {/* INPUT TIPO INSTAGRAM: enfocar o escribir pausa la historia. */}
          <div className={styles.commentInput}>
            <input
              type="text"
              placeholder="Responder a la historia..."
              value={comment}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onChange={(event) => setComment(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") publishComment();
              }}
            />
            {comment.trim() && <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={publishComment}>Enviar</button>}
          </div>
        </div>

        {showComments && (
          <div className={styles.commentsList}>
            {currentComments.length ? currentComments.map((text, index) => (
              <p key={`${text}-${index}`} className={styles.commentItem}><strong>Tú</strong> {text}</p>
            )) : (
              <p className={styles.commentItem}>Todavía no hay respuestas.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
