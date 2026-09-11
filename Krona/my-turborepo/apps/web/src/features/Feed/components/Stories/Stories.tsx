"use client";
import styles from "./Stories.module.css";
import { useState, useCallback, useEffect, useRef } from "react";
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
  const storyInputRef = useRef<HTMLInputElement>(null);

  // RECUPERA LAS HISTORIAS VISTAS PARA QUE NO SE PIERDAN AL RECARGAR.
  useEffect(() => {
    const seenIds = JSON.parse(localStorage.getItem("krona-seen-stories") ?? "[]") as string[];
    setStories((current) => current.map((story) => ({
      ...story,
      seen: seenIds.includes(story.id),
    })));
  }, []);

  function openStory(idx: number) { setSelected(idx); }
  function closeStory()           { setSelected(null); }

  const markSeen = useCallback((id: string) => {
    setStories((previous) => {
      // Si ya estaba vista, conserva la misma referencia y evita un render innecesario.
      if (previous.find((story) => story.id === id)?.seen) return previous;

      const updated = previous.map((story) => story.id === id ? { ...story, seen: true } : story);
      const seenIds = updated.filter((story) => story.seen).map((story) => story.id);
      localStorage.setItem("krona-seen-stories", JSON.stringify(seenIds));
      return updated;
    });
  }, []);

  // CREA UNA HISTORIA LOCAL A PARTIR DE UNA FOTO O VIDEO DEL EQUIPO.
  function addStory(file: File) {
    const mediaUrl = URL.createObjectURL(file);
    const mediaType: "image" | "video" = file.type.startsWith("video/") ? "video" : "image";
    const newStory: Story = {
      id: `local-${Date.now()}`,
      username: "Tu historia",
      initials: "TÚ",
      avatar: mediaType === "image" ? mediaUrl : undefined,
      time: "ahora",
      slides: [{ type: mediaType, url: mediaUrl }],
      seen: false,
    };

    setStories((current) => [newStory, ...current]);
    setSelected(0);
  }
  return (
  <>
    <section className={styles.wrap}>
      <div className={styles.bar}>

        {/* Crear historia */}
        <button
          type="button"
          className={`${styles.card} ${styles.createCard}`}
          onClick={() => storyInputRef.current?.click()}
        >
          <div className={styles.createPlus}>
            <Plus size={22} color="#fff" />
          </div>

          <span className={styles.createLabel}>
            Crear historia
          </span>
        </button>

        {/* INPUT OCULTO PARA AGREGAR MÁS HISTORIAS MOCK. */}
        <input
          ref={storyInputRef}
          type="file"
          accept="image/*,video/*"
          className={styles.storyInput}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) addStory(file);
            event.target.value = "";
          }}
        />


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


              {/* FOTO DE PERFIL: usa iniciales solamente si no existe avatar. */}
              <div className={styles.storyAvatar}>
                {story.avatar ? (
                  <Image
                    src={story.avatar}
                    alt={`Foto de perfil de ${story.username}`}
                    fill
                    sizes="30px"
                    className={styles.avatarImage}
                  />
                ) : (
                  <div className={styles.initials}>
                    {story.initials}
                  </div>
                )}
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
