"use client";
import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, ChevronLeft, ChevronRight, MoreHorizontal, CheckCircle2, LayoutGrid, Play } from "lucide-react";
import styles from "./PostCard.module.css";
import type { Post } from "../../types/post.types";
import Image from "next/image";

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const [liked, setLiked]         = useState(false);
    const [likes, setLikes]         = useState(post.likes);
    const [saved, setSaved]         = useState(false);
    const [slide, setSlide]         = useState(0);
    
    const isCarousel  = post.media.type === "carousel";
    const total       = post.media.urls.length;

    function goSlide(dir: number) {
        setSlide(prev => {
            const next = prev + dir;
            
            if (next <0) return total - 1;
            if (next >= total) return 0;

            return next;
        });
    };

    return (
        <article className={styles.card}>

            {/* ── Header ── */}
            <div className={styles.header}>
                <div className={`${styles.avatar} ${!post.user.isFollowing ? styles.hasStory : ""}`}>
                    {post.user.avatar
                        ? <Image src={post.user.avatar} alt={post.user.username} fill style={{ objectFit:"cover" }} />
                        : <span>{post.user.initials}</span>
                    }
                </div>
            
              <div className={styles.meta}>
                    <strong>
                        {post.user.username}
                        {post.user.verified && <CheckCircle2 size={13} className={styles.verified} />}
                    </strong>
                    <span>
                        {post.createdAt}
                        {post.isSuggestion && " · Sugerencia"}
                    </span>
              </div>
            
              {post.user.isFollowing === false && (
                <button className={styles.followBtn}>Seguir</button>
              )}

              <button className={styles.menuBtn} aria-label="Opciones">
                <MoreHorizontal size={18} />
              </button>
              
            </div>
          
            {/* ── Media ── */}
            <div className={styles.media}>

                {/* Imagen */}
                {post.media.type === "Image" && post.media.urls.length > 0 && ( 
                    //Solo muestra la imagen si existe al menos una URL dentro del arreglo.

                    <Image
                        src={post.media.urls[0]!}
                        alt={post.caption}
                        width={600} height={480}
                        style={{ width:"100%", height:"auto", objectFit:"cover" }}
                    ></Image>
                )}

                {/* Video */}
                {post.media.type === "tiktok" && (
                    <div className={styles.videoWrap}>
                        <iframe
                            width="100%"
                            height="680"
                            src="https://media.istockphoto.com/id/2206860352/video/watching-online-news-article-on-mobile-phone-and-laptop.mp4?s=mp4-640x640-is&k=20&c=CxdODOZJTzOy5b2YMaRsrY0Zu2jG_QNfttOx36Q9Zs0="
                            title="YouTube video player"
                            allowFullScreen 
                            //src={post.media.urls[0]} 
                            //controls 
                            className={styles.video}
                        />

                        <div className={styles.videoBadge}>
                            <Play size={11} /> {post.media.duration}
                        </div>
                    </div>
                )}

                {/* Carrusel */}
                {isCarousel && (
                    <div className={styles.carousel}>
                        <div
                            className={styles.track}
                            style={{ transform: `translateX(-${slide * 100}%)` }}
                        >
                            {post.media.urls.map((url, i) => (
                                <div key={i} className={styles.slide}>
                                    <Image src={url} alt={`Slide ${i+1}`} width={600} height={480}
                                        style={{ width:"100%", height:"auto", objectFit:"cover" }} />
                                </div>
                            ))}
                        </div>
                      
                        {slide > 0 && (
                            <button className={`${styles.carBtn} ${styles.prev}`}
                                onClick={() => goSlide(-1)} aria-label="Anterior">
                                <ChevronLeft size={16} />
                            </button>
                        )}

                        {slide < total - 1 && (
                            <button className={`${styles.carBtn} ${styles.next}`}
                                onClick={() => goSlide(1)} aria-label="Siguiente">
                                <ChevronRight size={16} />
                            </button>
                        )}

                        <div className={styles.dots}>
                            {post.media.urls.map((_, i) => (
                                <span key={i} className={`${styles.dot} ${i === slide ? styles.active : ""}`} />
                            ))}
                        </div>
                      
                        <div className={styles.badge}>
                            <LayoutGrid size={11} /> {slide + 1}/{total}
                        </div>
                    </div>
                )}
            </div>
          
            {/* ── Body ── */}
            <div className={styles.body}>
                <div className={styles.reactions}>
                    <button
                        className={`${styles.reactBtn} ${liked ? styles.liked : ""}`}
                        onClick={() => { setLiked(p => !p); setLikes(p => p + (liked ? -1 : 1)); }}
                        aria-label="Me gusta"
                    >
                        <Heart size={22} fill={liked ? "#e05252" : "none"} />
                        <span>{likes}</span>
                    </button>

                    <button className={styles.reactBtn} aria-label="Comentar">
                        <MessageCircle size={22} />
                        <span>{post.commentsCount}</span>
                    </button>

                    <button className={styles.reactBtn} aria-label="Compartir">
                        <Send size={20} />
                    </button>

                    <button
                        className={`${styles.saveBtn} ${saved ? styles.saved : ""}`}
                        onClick={() => setSaved(p => !p)}
                        aria-label="Guardar"
                    >
                        <Bookmark size={20} fill={saved ? "#1B3A6B" : "none"} />
                    </button>
                </div>
                
                {post.likedBy
                    ? <p className={styles.likedBy}>Les gusta a <strong>{post.likedBy}</strong> y otras personas</p>
                    : <p className={styles.likedBy}><strong>{likes} me gusta</strong></p>
                }

                <p className={styles.caption}>
                    <strong>{post.user.username}</strong>{" "}
                    {post.caption}
                </p>
              
                {post.commentsCount > 0 && (
                    <button className={styles.commentsLink}>
                        Ver los {post.commentsCount} comentarios
                    </button>
                )}

                <span className={styles.time}>{post.createdAt}</span>
            </div>

        </article>
    );
};