"use client";
import styles from "./Stories.module.css";
import { useState, useCallback } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import StoryModal from "./StoryModal/StoryModal";
import { mockStories } from "../../mocks/mockStories";
import type { Story, StoryBadge } from "../../types/story.types";

const BADGE_CONFIG: Record<StoryBadge, { label: string; cls: string | undefined }> = {
  disponible: { label: "● Disponible", cls: styles.badgeGreen  },
  promocion:  { label: "🏷 Promoción",  cls: styles.badgeOrange },
  nuevo:      { label: "✨ Nuevo",      cls: styles.badgeBlue   },
  cercaDeTi:  { label: "📍 Cerca",      cls: styles.badgePurple },
};

export const Stories = () => {
  const [stories, setStories] = useState<Story[]>(mockStories);
  const [selected, setSelected] = useState<number | null>(null);

  function openStory(idx: number) { setSelected(idx); }
  function closeStory()           { setSelected(null); }

  const markSeen = useCallback((id: string) => {
    setStories(prev =>
      prev.map(story => story.id === id ? { ...story, seen: true } : story)
    );
  }, []);
  return (
  <>
    <section className={styles.wrap}>
      <div className={styles.bar}>

        {/* Crear historia */}
        <button
          type="button"
          className={`${styles.card} ${styles.createCard}`}
        >
          <div className={styles.createPlus}>
            <Plus size={22} color="#fff" />
          </div>

          <span className={styles.createLabel}>
            Crear historia
          </span>
        </button>


        {/* Historias */}
        {stories.map((story, idx) => {
          const badge = story.badge
            ? BADGE_CONFIG[story.badge]
            : null;

          const firstImage = story.slides.find(
            slide => slide.type === "image"
          );

          const bgImage = firstImage?.url ?? story.avatar;

          return (
            <button
              key={story.id}
              type="button"
              className={`${styles.card} ${
                story.seen ? styles.seen : ""
              }`}
              onClick={() => openStory(idx)}
              aria-label={`Ver historia de ${story.username}`}
            >

              {/* Imagen */}
              {bgImage ? (
                <Image
                  src={bgImage}
                  alt={story.username}
                  fill
                  sizes="120px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  className={styles.colorBg}
                  style={{
                    background: story.color ?? "#1B3A6B",
                  }}
                />
              )}


              {/* Oscurecer imagen */}
              <div className={styles.overlay} />


              {/* Iniciales */}
              <div className={styles.storyAvatar}>
                <div className={styles.initials}>
                  {story.initials}
                </div>
              </div>


              {/* Información */}
              <div className={styles.bottom}>

                {badge && (
                  <span
                    className={`${styles.badge} ${badge.cls ?? ""}`}
                  >
                    {badge.label}
                  </span>
                )}

                <p className={styles.name}>
                  {story.username}
                </p>

                {story.badgeLabel && (
                  <p className={styles.sub}>
                    {story.badgeLabel}
                  </p>
                )}

              </div>

            </button>
          );
        })}

      </div>
    </section>


    {/* Modal */}
    {selected !== null && (
      <StoryModal
        stories={stories}
        initialIndex={selected}
        onClose={closeStory}
        onSeen={markSeen}
      />
    )}
  </>
);
 


};