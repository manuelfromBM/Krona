"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Save, X } from "lucide-react";
import styles from "../../ProfilePage.module.css";
import { gallery, highlights } from "../../mocks/profile.mock";
import type {
  ProfileData,
  ProfileSectionKey,
  ProfileSectionOrderKey,
  ProfileService,
} from "../../types/profile.types";

interface Props {
  publicView: boolean;
  isEditOpen: boolean;
  setIsEditOpen: (value: boolean) => void;
  isServiceEditOpen: boolean;
  setIsServiceEditOpen: (value: boolean) => void;
  editingServiceIndex: number | null;
  setEditableServices: (value: ProfileService[] | ((current: ProfileService[]) => ProfileService[])) => void;
  editableServices: ProfileService[];
  profile: ProfileData;
  setProfile: (value: ProfileData | ((current: ProfileData) => ProfileData)) => void;
  visibleHighlights: Record<string, boolean>;
  setVisibleHighlights: (value: Record<string, boolean>) => void;
  visibleSections: Record<ProfileSectionKey, boolean>;
  setVisibleSections: (value: Record<ProfileSectionKey, boolean>) => void;
  saveAll: (
    nextProfile?: ProfileData,
    nextServices?: ProfileService[],
    nextHighlights?: Record<string, boolean>,
    nextSections?: Record<ProfileSectionKey, boolean>,
    nextOrder?: ProfileSectionOrderKey[],
  ) => void;
  galleryIndex: number | null;
  closeGallery: () => void;
  showPreviousImage: () => void;
  showNextImage: () => void;
}

export function ProfileModals(props: Props) {
  const {
    publicView, isEditOpen, setIsEditOpen, isServiceEditOpen, setIsServiceEditOpen,
    editingServiceIndex, setEditableServices, editableServices, profile, setProfile,
    visibleHighlights, setVisibleHighlights, visibleSections, setVisibleSections,
    saveAll, galleryIndex, closeGallery, showPreviousImage, showNextImage,
  } = props;

  return (
    <>
      {!publicView && isEditOpen && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setIsEditOpen(false)}>
          <div className={styles.modalCard} role="dialog" aria-modal="true" aria-labelledby="edit-profile-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div><p className={styles.modalEyebrow}>Mi perfil</p><h2 id="edit-profile-title" className={styles.modalTitle}>Editar perfil</h2></div>
              <button type="button" className={styles.modalClose} onClick={() => setIsEditOpen(false)} aria-label="Cerrar"><X size={18} /></button>
            </div>

            <div className={styles.formGrid}>
              <label className={styles.formField}><span>Nombre</span><input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></label>
              <label className={styles.formField}><span>Segundo nombre / apellido</span><input value={profile.secondName} onChange={(e) => setProfile({ ...profile, secondName: e.target.value })} /></label>
              <label className={styles.formField}><span>Nombre comercial</span><input value={profile.commercialName} onChange={(e) => setProfile({ ...profile, commercialName: e.target.value })} /></label>
              <label className={styles.formField}><span>Categoría</span><input value={profile.category} onChange={(e) => setProfile({ ...profile, category: e.target.value })} /></label>
              <label className={styles.formField}><span>Ubicación</span><input value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} /></label>
              <label className={styles.formField}><span>Visibilidad</span><select value={profile.visibility} onChange={(e) => setProfile({ ...profile, visibility: e.target.value as ProfileData["visibility"] })}><option>Público</option><option>Privado</option></select></label>
              <label className={styles.formFieldWide}><span>Descripción</span><textarea rows={3} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} /></label>
              <label className={styles.formField}><span>Teléfono</span><input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></label>
              <label className={styles.formField}><span>Instagram</span><input value={profile.instagram} onChange={(e) => setProfile({ ...profile, instagram: e.target.value })} /></label>
              <label className={styles.formFieldWide}><span>Dirección</span><input value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} /></label>
            </div>

            <div className={styles.formSection}>
              <div className={styles.formSectionTitle}>Historias destacadas</div>
              <div className={styles.toggleGrid}>
                {highlights.map(({ label }) => (
                  <label className={styles.toggleItem} key={label}>
                    <span>{label}</span>
                    <input type="checkbox" checked={visibleHighlights[label] ?? true} onChange={(e) => setVisibleHighlights({ ...visibleHighlights, [label]: e.target.checked })} />
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formSection}>
              <div className={styles.formSectionTitle}>Secciones visibles del perfil</div>
              <div className={styles.toggleGrid}>
                {(["team", "services", "reviews", "gallery"] as ProfileSectionKey[]).map((key) => (
                  <label className={styles.toggleItem} key={key}>
                    <span>{key === "team" ? "Nuestro equipo" : key === "services" ? "Servicios" : key === "reviews" ? "Reseñas" : "Galería"}</span>
                    <input type="checkbox" checked={visibleSections[key]} onChange={(e) => setVisibleSections({ ...visibleSections, [key]: e.target.checked })} />
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formSection}>
              <div className={styles.formSectionTitle}>Horario de atención</div>
              <div className={styles.formGrid}>
                <label className={styles.formField}><span>Lun - Vie</span><input value={profile.hours.weekday} onChange={(e) => setProfile({ ...profile, hours: { ...profile.hours, weekday: e.target.value } })} /></label>
                <label className={styles.formField}><span>Sábado</span><input value={profile.hours.saturday} onChange={(e) => setProfile({ ...profile, hours: { ...profile.hours, saturday: e.target.value } })} /></label>
                <label className={styles.formField}><span>Domingo</span><input value={profile.hours.sunday} onChange={(e) => setProfile({ ...profile, hours: { ...profile.hours, sunday: e.target.value } })} /></label>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button type="button" className={styles.secondaryButton} onClick={() => setIsEditOpen(false)}>Cerrar</button>
              <button type="button" className={styles.primaryButton} onClick={() => { saveAll(); setIsEditOpen(false); }}>Guardar cambios</button>
            </div>
          </div>
        </div>
      )}

      {!publicView && isServiceEditOpen && editingServiceIndex !== null && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setIsServiceEditOpen(false)}>
          <div className={styles.modalCard} role="dialog" aria-modal="true" aria-labelledby="edit-service-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div><p className={styles.modalEyebrow}>Servicios</p><h2 id="edit-service-title" className={styles.modalTitle}>Editar servicio</h2></div>
              <button type="button" className={styles.modalClose} onClick={() => setIsServiceEditOpen(false)} aria-label="Cerrar"><X size={18} /></button>
            </div>
            <div className={styles.formGrid}>
              <label className={styles.formFieldWide}><span>Nombre</span><input value={editableServices[editingServiceIndex].name} onChange={(e) => setEditableServices((current) => current.map((service, index) => index === editingServiceIndex ? { ...service, name: e.target.value } : service))} /></label>
              <label className={styles.formField}><span>Precio</span><input value={editableServices[editingServiceIndex].price} onChange={(e) => setEditableServices((current) => current.map((service, index) => index === editingServiceIndex ? { ...service, price: e.target.value } : service))} /></label>
              <label className={styles.formField}><span>Duración</span><input value={editableServices[editingServiceIndex].duration} onChange={(e) => setEditableServices((current) => current.map((service, index) => index === editingServiceIndex ? { ...service, duration: e.target.value } : service))} /></label>
              <label className={styles.formFieldWide}><span>Descripción</span><textarea rows={4} value={editableServices[editingServiceIndex].description} onChange={(e) => setEditableServices((current) => current.map((service, index) => index === editingServiceIndex ? { ...service, description: e.target.value } : service))} /></label>
            </div>
            <div className={styles.modalFooter}>
              <button type="button" className={styles.secondaryButton} onClick={() => setIsServiceEditOpen(false)}>Cerrar</button>
              <button type="button" className={styles.primaryButton} onClick={() => { saveAll(profile, editableServices, visibleHighlights); setIsServiceEditOpen(false); }}><Save size={14} />Guardar servicio</button>
            </div>
          </div>
        </div>
      )}

      {galleryIndex !== null && (
        <div className={styles.lightboxBackdrop} role="presentation" onMouseDown={closeGallery}>
          <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Galería" onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" className={styles.lightboxClose} onClick={closeGallery} aria-label="Cerrar galería"><X size={20} /></button>
            <button type="button" className={styles.lightboxArrowLeft} onClick={showPreviousImage} aria-label="Imagen anterior"><ChevronLeft size={28} /></button>
            <div className={styles.lightboxImage}><Image src={gallery[galleryIndex]} alt={`Galería ${galleryIndex + 1}`} fill sizes="90vw" className={styles.lightboxImageContent} /></div>
            <button type="button" className={styles.lightboxArrowRight} onClick={showNextImage} aria-label="Imagen siguiente"><ChevronRight size={28} /></button>
            <div className={styles.lightboxCounter}>{galleryIndex + 1} / {gallery.length}</div>
          </div>
        </div>
      )}
    </>
  );
}