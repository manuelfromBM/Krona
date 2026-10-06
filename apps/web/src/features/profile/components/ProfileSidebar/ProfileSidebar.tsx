"use client";

import type { ReactNode } from "react";

import { Activity, CalendarDays, CheckCircle2, Clock3, Eye, Mail, MapPin, MessageCircle, Navigation, Phone, Settings2, Star, Users } from "lucide-react";
import styles from "../../ProfilePage.module.css";
import type { ProfileData, ProfileSectionKey, ProfileSectionOrderKey, ProfileService } from "../../types/profile.types";
import { instagramUrl, mapsUrl, whatsappUrl } from "../../utils/profile.utils";

interface Props {
  publicView: boolean;
  profile: ProfileData;
  visibleSections: Record<ProfileSectionKey, boolean>;
  isSectionEditorOpen: boolean;
  openSectionEditor: () => void;
  saveSectionEditor: () => void;
  toggleProfileSectionVisibility: (key: ProfileSectionKey, visible: boolean) => void;
  onEdit: () => void;
  saveAll: (
    nextProfile?: ProfileData,
    nextServices?: ProfileService[],
    nextHighlights?: Record<string, boolean>,
    nextSections?: Record<ProfileSectionKey, boolean>,
    nextOrder?: ProfileSectionOrderKey[],
  ) => void;
}

export function ProfileSidebar({
  publicView, profile, visibleSections, isSectionEditorOpen,
  openSectionEditor, saveSectionEditor, toggleProfileSectionVisibility, onEdit,
  saveAll,
}: Props) {
  return (
    <aside className={styles.sideColumn}>
      {publicView ? (
        <>
          <section className={styles.sideCard}>
            <div className={styles.sideTitleRow}><div className={styles.sideIcon}><CheckCircle2 size={16} /></div><div><h2 className={styles.sideTitle}>Perfil verificado</h2><p className={styles.sideSubtitle}>Información pública de este perfil</p></div></div>
            <div className={styles.publicTrustList}>
              <div className={styles.publicTrustItem}><CheckCircle2 size={14} /><span>Identidad y datos del perfil verificados</span></div>
              <div className={styles.publicTrustItem}><Star size={14} /><span>4.9 de valoración promedio</span></div>
            </div>
          </section>

          <section className={styles.sideCard}>
            <div className={styles.sideTitleRow}><div className={styles.sideIcon}><Mail size={16} /></div><div><h2 className={styles.sideTitle}>Información de contacto</h2><p className={styles.sideSubtitle}>Datos disponibles para clientes</p></div></div>
            <ContactRow icon={<Phone size={14} />} label="Teléfono" value={profile.phone} href={whatsappUrl(profile.phone)} />
            <ContactRow icon={<span aria-hidden="true" style={{ fontSize: "15px", fontWeight: 800 }}>@</span>} label="Instagram" value={profile.instagram} href={instagramUrl(profile.instagram)} />
            <ContactRow icon={<MapPin size={14} />} label="Dirección" value={profile.address} href={mapsUrl(profile.address)} />
          </section>

          <HoursCard profile={profile} publicView />
          <QuickActions profile={profile} publicView />
        </>
      ) : (
        <>
          <section className={styles.sideCard}>
            <div className={styles.sideTitleRow}><div className={styles.sideIcon}><CheckCircle2 size={16} /></div><div><h2 className={styles.sideTitle}>Perfil completo</h2><p className={styles.sideSubtitle}>Tu perfil está listo para recibir visitas</p></div></div>
            <div className={styles.progressTrack}><div className={styles.progressValue} /></div>
            <div className={styles.progressLabel}><span>Completado</span><strong>82%</strong></div>
          </section>

          <section className={`${styles.sideCard} ${styles.sectionEditorCard}`}>
            <div className={styles.sideTitleRow}><div className={styles.sideIcon}><Settings2 size={16} /></div><div><h2 className={styles.sideTitle}>{isSectionEditorOpen ? "Editando secciones" : "Editar secciones"}</h2><p className={styles.sideSubtitle}>{isSectionEditorOpen ? "Arrastra, ordena u oculta secciones" : "Personaliza el orden y las secciones visibles"}</p></div></div>
            {!isSectionEditorOpen ? (
              <button type="button" className={styles.sectionEditorOpenButton} onClick={openSectionEditor}>Editar secciones</button>
            ) : (
              <>
                <p className={styles.sectionEditorHint}>Usa el control de arrastre que aparece en cada sección. Los cambios quedan pendientes hasta guardar.</p>
                <div className={styles.sectionEditorOptions}>
                  {(["team", "services", "reviews", "gallery"] as ProfileSectionKey[]).map((key) => (
                    <label className={styles.sectionEditorOption} key={key}>
                      <span>{key === "team" ? "Nuestro equipo" : key === "services" ? "Servicios" : key === "reviews" ? "Reseñas" : "Galería"}</span>
                      <input type="checkbox" checked={visibleSections[key]} onChange={(event) => toggleProfileSectionVisibility(key, event.target.checked)} />
                    </label>
                  ))}
                </div>
                <button type="button" className={styles.sectionEditorSaveButton} onClick={saveSectionEditor}>Guardar y volver a la vista normal</button>
              </>
            )}
          </section>

          <section className={styles.sideCard}>
            <div className={styles.sideTitleRow}><div className={styles.sideIcon}><Activity size={16} /></div><div><h2 className={styles.sideTitle}>Estado del perfil</h2><p className={styles.sideSubtitle}>Tu perfil es visible</p></div></div>
            <div className={styles.infoRow}><div className={styles.infoIcon}><Eye size={14} /></div><div className={styles.infoContent}><p className={styles.infoLabel}>Visibilidad</p><p className={styles.infoValue}>{profile.visibility}</p></div><button type="button" className={styles.infoAction} onClick={() => saveAll({ ...profile, visibility: profile.visibility === "Público" ? "Privado" : "Público" })}>Cambiar</button></div>
          </section>

          <section className={styles.sideCard}>
            <div className={styles.sideTitleRow}><div className={styles.sideIcon}><Mail size={16} /></div><div><h2 className={styles.sideTitle}>Información de contacto</h2><p className={styles.sideSubtitle}>Datos visibles en tu perfil</p></div></div>
            <ContactRow icon={<Phone size={14} />} label="Teléfono" value={profile.phone} href={whatsappUrl(profile.phone)} onEdit={onEdit} />
            <ContactRow icon={<span aria-hidden="true" style={{ fontSize: "15px", fontWeight: 800 }}>@</span>} label="Instagram" value={profile.instagram} href={instagramUrl(profile.instagram)} onEdit={onEdit} />
            <ContactRow icon={<MapPin size={14} />} label="Dirección" value={profile.address} href={mapsUrl(profile.address)} onEdit={onEdit} />
          </section>

          <HoursCard profile={profile} />
          <section className={styles.sideCard}>
            <div className={styles.sideTitleRow}><div className={styles.sideIcon}><Settings2 size={16} /></div><div><h2 className={styles.sideTitle}>Acciones rápidas</h2><p className={styles.sideSubtitle}>Administra tu presencia</p></div></div>
            <div className={styles.quickActions}><button type="button" className={styles.quickButton}><CalendarDays size={13} />Agenda</button><button type="button" className={styles.quickButton}><MessageCircle size={13} />Mensajes</button></div>
          </section>
          <section className={styles.ctaCard}><h2 className={styles.ctaTitle}>¿Quieres hacer crecer tu perfil?</h2><p className={styles.ctaText}>Publica más servicios y destaca tu negocio para llegar a nuevos clientes.</p><button type="button" className={styles.ctaButton}>Ver herramientas</button></section>
          <section className={styles.sideCard}>
            <div className={styles.sideTitleRow}><div className={styles.sideIcon}><Star size={16} /></div><div><h2 className={styles.sideTitle}>Actividad reciente</h2><p className={styles.sideSubtitle}>Resumen de tu perfil</p></div></div>
            <InfoMetric icon={<Eye size={14} />} label="Visitas al perfil" value="1.284 este mes" />
            <InfoMetric icon={<Users size={14} />} label="Nuevos seguidores" value="+186 este mes" />
          </section>
        </>
      )}
    </aside>
  );
}

function ContactRow({ icon, label, value, href, onEdit }: { icon: ReactNode; label: string; value: string; href: string; onEdit?: () => void }) {
  return <div className={styles.infoRow}><div className={styles.infoIcon}>{icon}</div><div className={styles.infoContent}><p className={styles.infoLabel}>{label}</p><a className={styles.infoValueLink} href={href} target="_blank" rel="noreferrer">{value}</a></div>{onEdit && <button type="button" className={styles.infoAction} onClick={onEdit}>Editar</button>}</div>;
}

function HoursCard({ profile, publicView = false }: { profile: ProfileData; publicView?: boolean }) {
  return <section className={styles.sideCard}><div className={styles.sideTitleRow}><div className={styles.sideIcon}><Clock3 size={16} /></div><div><h2 className={styles.sideTitle}>Horario de atención</h2><p className={styles.sideSubtitle}>{publicView ? "Horario disponible para visitantes" : "Horario visible para visitantes"}</p></div></div><InfoMetric label="Lun - Vie" value={profile.hours.weekday} /><InfoMetric label="Sábado" value={profile.hours.saturday} /><InfoMetric label="Domingo" value={profile.hours.sunday} /></section>;
}

function QuickActions({ profile, publicView }: { profile: ProfileData; publicView: boolean }) {
  return <section className={styles.sideCard}><div className={styles.sideTitleRow}><div className={styles.sideIcon}><MessageCircle size={16} /></div><div><h2 className={styles.sideTitle}>Acciones rápidas</h2><p className={styles.sideSubtitle}>{publicView ? "Interactúa con este perfil" : "Administra tu presencia"}</p></div></div><div className={styles.quickActions}>{publicView ? <><a className={styles.quickButton} href={whatsappUrl(profile.phone)} target="_blank" rel="noreferrer"><MessageCircle size={13} />WhatsApp</a><a className={styles.quickButton} href={mapsUrl(profile.address)} target="_blank" rel="noreferrer"><Navigation size={13} />Cómo llegar</a></> : <><button type="button" className={styles.quickButton}><CalendarDays size={13} />Agenda</button><button type="button" className={styles.quickButton}><MessageCircle size={13} />Mensajes</button></>}</div></section>;
}

function InfoMetric({ icon, label, value }: { icon?: ReactNode; label: string; value: string }) {
  return <div className={styles.infoRow}>{icon && <div className={styles.infoIcon}>{icon}</div>}<div className={styles.infoContent}><p className={styles.infoLabel}>{label}</p><p className={styles.infoValue}>{value}</p></div></div>;
}