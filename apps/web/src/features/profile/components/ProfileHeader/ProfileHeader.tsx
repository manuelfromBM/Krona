"use client";

import Image from "next/image";
import { Check, Eye, MapPin, MessageCircle, Pencil, Share2, UserPlus } from "lucide-react";
import styles from "../../ProfilePage.module.css";
import type { ProfileData } from "../../types/profile.types";
import { coverImage } from "../../mocks/profile.mock";
import { ProfileHighlights } from "../ProfileHighlights/ProfileHighlights";
import { mapsUrl } from "../../utils/profile.utils";

interface Props {
  publicView: boolean;
  profile: ProfileData;
  displayName: string;
  profileAvatar: string;
  onEdit: () => void;
  visibleHighlights: Record<string, boolean>;
}

export function ProfileHeader({ publicView, profile, displayName, profileAvatar, onEdit, visibleHighlights }: Props) {
  const location = publicView ? "Melipilla, Chile" : profile.location;
  const bio = publicView
    ? "Servicio mecánico integral para todo tipo de vehículos. Diagnóstico, mantención y reparación con garantía. Tu confianza es nuestro motor."
    : profile.bio;

  return (
    <section className={styles.profileHeader}>
      <div className={styles.cover}>
        <Image
          src={coverImage}
          alt="Portada del perfil"
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 900px"
          className={styles.coverImage}
        />
        <div className={styles.coverOverlay} />
      </div>

      <div className={styles.profileMain}>
        <div className={styles.avatar}>
          <Image src={profileAvatar} alt="Foto de perfil" fill priority sizes="112px" className={styles.avatarImage} />
        </div>

        <div className={styles.profileIdentity}>
          <div className={styles.nameRow}>
            <h1 className={styles.profileName}>{displayName}</h1>
            <span className={styles.verified} title="Perfil verificado">
              <Check size={11} strokeWidth={3} />
            </span>
          </div>
          <p className={styles.profileCategory}>{publicView ? "Taller mecánico" : profile.category}</p>
          <a className={styles.locationLink} href={mapsUrl(location)} target="_blank" rel="noreferrer">
            <MapPin size={13} />
            <span>{location}</span>
          </a>
          <p className={styles.bio}>{bio}</p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}><strong>342</strong><span>Publicaciones</span></div>
          <div className={styles.stat}><strong>18.7K</strong><span>Seguidores</span></div>
          <div className={styles.stat}><strong>142</strong><span>Siguiendo</span></div>
        </div>

        <div className={styles.profileActions}>
          {publicView ? (
            <>
              <button type="button" className={styles.primaryButton}><UserPlus size={13} />Seguir</button>
              <button type="button" className={styles.secondaryButton}><MessageCircle size={13} />Contactar</button>
              <button type="button" className={styles.secondaryButton}><Share2 size={13} />Compartir</button>
            </>
          ) : (
            <>
              <button type="button" className={styles.primaryButton} onClick={onEdit}><Pencil size={13} />Editar perfil</button>
              <button type="button" className={styles.secondaryButton}><Eye size={13} />Ver como visitante</button>
              <button type="button" className={styles.secondaryButton}><Share2 size={13} />Compartir</button>
            </>
          )}
        </div>
      </div>

      <ProfileHighlights visibleHighlights={visibleHighlights} />
    </section>
  );
}