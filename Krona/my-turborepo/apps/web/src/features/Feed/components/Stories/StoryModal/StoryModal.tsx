"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle } from "lucide-react";
import styles from "./StoryModal.module.css";
import type { Story } from "../../../types/story.types";

interface StoryModalProps {
    stories: Story[];
    initialIndex: number;
    onClose: () => void;
    onSeen: (id: string) => void;
}

const SLIDE_DURATION = 5000;

export default function StoryModal({stories, initialIndex, onClose, onSeen}: StoryModalProps) {

    // ACA LLAMAMOS LAS VARIABLES CON SU NOMBRE
    const [storyIdx, setStoryIdx] = useState(initialIndex);
    const [slideIdx, setSlideIdx] = useState(0);
    const [progress, setProgress] = useState(0);

    // LLAMAMOS LAS VARIABLES DE COMENTARIO Y LIKE DE STORY
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState<string[]>([]);

    //***se podria agregar un contador para recibir los datos con el backen
    // const [contadorHistoria, setContadorHistoria] = useState([]); */

    const current = stories[storyIdx];
    
    if (!current) return null;
    const totalSlides = current.slides.length;
    const slide = current.slides[slideIdx]; // se agrega este comando para agregar las fotos y video 

    const nextSlide = useCallback(() => {
        if (slideIdx < totalSlides - 1) {
            setSlideIdx(s => s + 1);
        } else if (storyIdx < stories.length - 1) {
            setStoryIdx(s => s + 1);
            setSlideIdx(0);
        } else {
            onClose();
        }
    }, [slideIdx, storyIdx, totalSlides, stories.length, onClose]);

    const prevSlide = useCallback(() => {
        if (slideIdx > 0) {
            setSlideIdx(s => s - 1);
        } else if (storyIdx > 0) {
            setStoryIdx(s => s - 1);
            setSlideIdx(0);
        }
    }, [slideIdx, storyIdx]);

    // Marcar como visto
    useEffect(() => {
        onSeen(current.id);
    }, [current.id, onSeen]);

    useEffect (() => {
        
        setProgress(0);

        // Guarda el momento en que comenzó el slide
        const start = Date.now();

        const interval = setInterval(() => {


            //tiempo transcurrido desde que inicio la historia
            const elapsed = Date.now() -start;

            const percent = (elapsed / SLIDE_DURATION) * 100;

            if (percent >= 100) {
                setProgress(100);
                clearInterval(interval);
                nextSlide();
            } else {
                setProgress(percent);
            }
        }, 50);

        return () => clearInterval(interval);

    }, [storyIdx, slideIdx, nextSlide]);


    // Cerrar con Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [nextSlide, prevSlide, onClose]);


    return (

        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>

                {/* Progress bars */}
                <div className={styles.progressBar}>
                    {current.slides.map((_, i) => (
                        <div key={i} className={styles.segment}>
                            <div
                                className={styles.fill}
                                style={{
                                    width: i < slideIdx ? "100%"
                                    : i === slideIdx ? `${progress}%`
                                    : "0%"
                                }}
                            />
                        </div>
                    ))}
                </div>
            
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.avatar}>
                        {current.avatar
                            ? <Image src={current.avatar} alt={current.username} fill style={{ objectFit:"cover" }} />
                            : <span>{current.initials}</span>
                        }
                    </div>

                    <div>
                        <p className={styles.username}>{current.username}</p>
                        <p className={styles.time}>{current.time}</p>
                    </div>

                    <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
                        <X size={20} />
                    </button>
                </div>
              
              {/* Imagen */}
                <div className={styles.content}>
                    {/* AGREGAR IMAGENES */}
                    {slide?.type === "image" && (
                        <Image
                            //src={current.slides[slideIdx] ?? ""}
                            src={slide.url}
                            alt={`Historia de ${current.username}`}
                            fill
                            priority
                            style={{ objectFit: "cover" }}
                        />
                    )}

                    {slide?.type === "video"  && (
                        <video
                            src={slide.url}
                            className={styles.video}
                            autoPlay
                            muted
                        />                        
                    )}
                    
                </div>
                        
                {/* Navegación */}
                <button className={`${styles.navBtn} ${styles.left}`} onClick={prevSlide} aria-label="Anterior">
                    <ChevronLeft size={24} />
                </button>

                <button className={`${styles.navBtn} ${styles.right}`} onClick={nextSlide} aria-label="Siguiente">
                    <ChevronRight size={24} />
                </button>
              
                {/**FOOTER DEL LIKE Y COMENTARIOS */}
                <div className={styles.footer}>

                    {/**BOTON DE ME GUSTA O LIKE */}
                    <button 
                        className={`${styles.actionBtn} ${liked ? styles.liked : ""}`}
                        onClick={() => { setLiked(p => !p); setLikes(p => p + (liked ? -1 : 1)); }}
                        aria-label="Me gusta"
                    >
                        <Heart size={22} fill={liked ? "#e05252" : "none"} color={liked ? "#e05252" : "#fff"} />
                        <span>{likes > 0 ? likes : ""}</span>
                    </button>

                    {/**BOTON DE COMENTARIO */}
                    <button
                        className={styles.actionBtn}
                        onClick={() => setShowComments (p => !p)}
                        aria-label="Comentar"
                    >
                        <MessageCircle size={22} color="#fff"></MessageCircle>
                        <span>{comments.length > 0 ? comments.length : ""}</span>
                    </button>

                    {/** INPUT DEL COMENTARIO*/}
                    <div className={styles.commenInput}>
                        <input 
                            type="text"
                            placeholder="Añade un comentario.."
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter" && comment.trim()) {
                                    setComments(p => [...p, comment.trim()]);
                                    setComment("");
                                }
                            }}
                        ></input>
                        {comment.trim () && (
                            <button onClick={() => {
                                setComments(p => [...p, comment.trim()]);
                                setComment("");
                            }}>
                                Publicar
                            </button>
                        )}
                    </div>
                </div>

                {/**LISTA DE COMENTARIO */}
                {showComments && comments.length > 0 && (
                    <div className={styles.commentsList}>
                        {comments.map((c, i) => (
                            <p key={i} className={styles.commentItem}>
                                <strong>tu</strong> {c}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
};

