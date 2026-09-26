"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, LayoutGrid, Play } from "lucide-react";

import styles from "../PostCard.module.css";
import type { Post } from "../../../types/post.types";

export function PostMedia({ post }: { post: Post }) {
  const [slide, setSlide] = useState(0);
  const total = post.media.urls.length;

  function move(direction: number) {
    setSlide((current) => {
      const next = current + direction;
      if (next < 0) return total - 1;
      if (next >= total) return 0;
      return next;
    });
  }

  return (
    <div className={styles.media}>
      {post.media.type === "image" && post.media.urls[0] && (
        <Image
          src={post.media.urls[0]}
          alt={post.caption}
          width={600}
          height={480}
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      )}

      {post.media.type === "video" && (
        <div className={styles.videoWrap}>
          <iframe
            width="100%"
            height="680"
            src={post.media.urls[0]}
            title="Video de publicación"
            allowFullScreen
            className={styles.video}
          />
          <div className={styles.videoBadge}><Play size={11} />{post.media.duration}</div>
        </div>
      )}

      {post.media.type === "carrusel" && (
        <div className={styles.carousel}>
          <div className={styles.track} style={{ transform: `translateX(-${slide * 100}%)` }}>
            {post.media.urls.map((url, index) => (
              <div key={url} className={styles.slide}>
                <Image
                  src={url}
                  alt={`Slide ${index + 1}`}
                  width={600}
                  height={480}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
          {slide > 0 && <button type="button" className={`${styles.carBtn} ${styles.prev}`} onClick={() => move(-1)} aria-label="Anterior"><ChevronLeft size={16} /></button>}
          {slide < total - 1 && <button type="button" className={`${styles.carBtn} ${styles.next}`} onClick={() => move(1)} aria-label="Siguiente"><ChevronRight size={16} /></button>}
          <div className={styles.dots}>{post.media.urls.map((url, index) => <span key={url} className={`${styles.dot} ${index === slide ? styles.active : ""}`} />)}</div>
          <div className={styles.badge}><LayoutGrid size={11} />{slide + 1}/{total}</div>
        </div>
      )}
    </div>
  );
}
