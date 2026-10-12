"use client";

import Image from "next/image";
import { BadgeCheck, Heart, MapPin, Star, X } from "lucide-react";
import { useEffect } from "react";
import type { SearchBusiness } from "../../types/search.types";
import styles from "./BusinessPreview.module.css";

interface Props {
  business: SearchBusiness | null;
  favorite: boolean;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
}

export function BusinessPreview({
  business,
  favorite,
  onClose,
  onToggleFavorite,
}: Props) {
  useEffect(() => {
    if (!business) return;
    const closeWithEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();
    document.addEventListener("keydown", closeWithEscape);
    return () => document.removeEventListener("keydown", closeWithEscape);
  }, [business, onClose]);

  if (!business) return null;
  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="business-preview-title"
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Cerrar vista previa"
        >
          <X size={18} />
        </button>
        <div className={styles.imageWrap}>
          {business.image && (
            <Image
              src={business.image}
              alt={business.name}
              fill
              sizes="600px"
              className={styles.image}
            />
          )}
        </div>
        <div className={styles.body}>
          <div className={styles.titleRow}>
            <div>
              <span>{business.category}</span>
              <h2 id="business-preview-title">
                {business.name} {business.verified && <BadgeCheck size={17} />}
              </h2>
            </div>
            <button
              type="button"
              className={favorite ? styles.favorite : ""}
              onClick={() => onToggleFavorite(business.id)}
              aria-label={
                favorite ? "Quitar de favoritos" : "Guardar en favoritos"
              }
            >
              <Heart size={19} fill={favorite ? "currentColor" : "none"} />
            </button>
          </div>
          <div className={styles.meta}>
            {business.rating !== undefined && (
              <span>
                <Star size={14} fill="currentColor" /> {business.rating}
              </span>
            )}
            {business.distance && (
              <span>
                <MapPin size={14} /> {business.distance}
              </span>
            )}
          </div>
          <p>
            {business.description ||
              "Conoce sus servicios, disponibilidad y opciones de atención."}
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondary}
              onClick={() => onToggleFavorite(business.id)}
            >
              {favorite ? "Guardado" : "Guardar"}
            </button>
            <button type="button" className={styles.primary}>
              Ver negocio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
