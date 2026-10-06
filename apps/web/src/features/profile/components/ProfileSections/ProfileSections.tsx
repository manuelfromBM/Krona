"use client";

import Image from "next/image";
import type { CSSProperties, MutableRefObject, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { ChevronLeft, ChevronRight, Clock3, GripVertical } from "lucide-react";
import PostCard from "../../../Feed/components/PostCard/PostCard";
import styles from "../../ProfilePage.module.css";
import { POSTS_PER_PAGE } from "../../constants/profile.constants";
import { gallery, reviews, team } from "../../mocks/profile.mock";
import type {
  ProfileData,
  ProfileSectionKey,
  ProfileSectionOrderKey,
  ProfileService,
} from "../../types/profile.types";
import type { Post } from "../../../Feed/types/post.types";

interface Props {
  publicView: boolean;
  isSectionEditorOpen: boolean;
  profile: ProfileData;
  editableServices: ProfileService[];
  visibleSections: Record<ProfileSectionKey, boolean>;
  sectionOrder: ProfileSectionOrderKey[];
  profileFeedPosts: Post[];
  showAllPosts: boolean;
  postPage: number;
  setShowAllPosts: (value: boolean | ((current: boolean) => boolean)) => void;
  setPostPage: (value: number | ((current: number) => number)) => void;
  openServiceEditor: (index: number) => void;
  setGalleryIndex: (index: number) => void;
  saveAll: (
    nextProfile?: ProfileData,
    nextServices?: ProfileService[],
    nextHighlights?: Record<string, boolean>,
    nextSections?: Record<ProfileSectionKey, boolean>,
    nextOrder?: ProfileSectionOrderKey[],
  ) => void;
  visibleHighlights: Record<string, boolean>;
  getSectionClassName: (key: ProfileSectionOrderKey, styles: Record<string, string>) => string;
  getSectionTransform: (key: ProfileSectionOrderKey) => CSSProperties | undefined;
  handleSectionPointerDown: (event: ReactPointerEvent<HTMLDivElement>, key: ProfileSectionOrderKey) => void;
  sectionRefs: MutableRefObject<Record<string, HTMLDivElement | null>>;
}

export function ProfileSections(props: Props) {
  const {
    publicView, isSectionEditorOpen, profile, editableServices, visibleSections,
    sectionOrder, profileFeedPosts, showAllPosts, postPage, setShowAllPosts,
    setPostPage, openServiceEditor, setGalleryIndex, saveAll, visibleHighlights,
    getSectionClassName, getSectionTransform, handleSectionPointerDown, sectionRefs,
  } = props;

  const wrapper = (key: ProfileSectionOrderKey, children: ReactNode) => (
    <div
      ref={(element) => { sectionRefs.current[key] = element; }}
      className={getSectionClassName(key, styles)}
      style={{ order: sectionOrder.indexOf(key), ...getSectionTransform(key) }}
      onPointerDown={(event) => handleSectionPointerDown(event, key)}
    >
      {children}
    </div>
  );

  const handleVisibility = (key: ProfileSectionKey) =>
    saveAll(profile, editableServices, visibleHighlights, { ...visibleSections, [key]: false });

  return (
    <>
      {wrapper("publications",
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sortableSectionHeader}>
              {!publicView && isSectionEditorOpen && <span className={styles.dragHandle} aria-hidden="true" title="Arrastrar sección"><GripVertical size={15} /></span>}
              <h2 className={styles.sectionTitle}>Publicaciones</h2>
            </div>
            <button type="button" className={styles.sectionAction} onClick={() => { setShowAllPosts((current) => !current); setPostPage(1); }}>
              {showAllPosts ? "Ver menos publicaciones" : "Ver más publicaciones"}
              {showAllPosts ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
            </button>
          </div>
          <div className={styles.profilePostsFeedGrid}>
            {(showAllPosts ? profileFeedPosts.slice((postPage - 1) * POSTS_PER_PAGE, postPage * POSTS_PER_PAGE) : profileFeedPosts.slice(0, 3)).map((post) => (
              <PostCard key={post.id} post={post} compact ownerView={!publicView} />
            ))}
          </div>
          {showAllPosts && (
            <div className={styles.profilePostsControls}>
              <div className={styles.pagination}>
                <button type="button" className={styles.paginationButton} disabled={postPage === 1} onClick={() => setPostPage((page) => page - 1)}>←</button>
                {Array.from({ length: Math.ceil(profileFeedPosts.length / POSTS_PER_PAGE) }, (_, index) => index + 1).map((page) => (
                  <button key={page} type="button" className={postPage === page ? styles.paginationButtonActive : styles.paginationButton} onClick={() => setPostPage(page)}>{page}</button>
                ))}
                <button type="button" className={styles.paginationButton} disabled={postPage === Math.ceil(profileFeedPosts.length / POSTS_PER_PAGE)} onClick={() => setPostPage((page) => page + 1)}>→</button>
              </div>
            </div>
          )}
        </section>
      )}

      {!showAllPosts && visibleSections.team && wrapper("team",
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sortableSectionHeader}>{!publicView && isSectionEditorOpen && <span className={styles.dragHandle} aria-hidden="true" title="Arrastrar sección"><GripVertical size={15} /></span>}<h2 className={styles.sectionTitle}>Nuestro equipo</h2></div>
            {!publicView && <><button type="button" className={styles.sectionAction}>Administrar equipo →</button><button type="button" className={styles.sectionHideAction} onClick={() => handleVisibility("team")}>Ocultar</button></>}
          </div>
          <div className={styles.teamGrid}>
            {team.map((member) => (
              <article className={styles.teamCard} key={member.name}>
                <div className={styles.teamAvatar}><Image src={member.image} alt={member.name} fill sizes="62px" /></div>
                <div className={styles.teamInfo}>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  <div className={member.busy ? styles.status + " " + styles.statusBusy : styles.status}><span className={styles.statusDot} />{member.status}</div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {!showAllPosts && visibleSections.services && wrapper("services",
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sortableSectionHeader}>{!publicView && isSectionEditorOpen && <span className={styles.dragHandle} aria-hidden="true" title="Arrastrar sección"><GripVertical size={15} /></span>}<h2 className={styles.sectionTitle}>Servicios</h2></div>
            {!publicView && <><button type="button" className={styles.sectionAction}>Administrar servicios →</button><button type="button" className={styles.sectionHideAction} onClick={() => handleVisibility("services")}>Ocultar</button></>}
          </div>
          <div className={styles.servicesGrid}>
            {editableServices.map((service, index) => (
              <article className={styles.serviceCard} key={service.name}>
                <div className={styles.serviceImage}><Image src={service.image} alt={service.name} fill sizes="(max-width: 600px) 50vw, 220px" /></div>
                <div className={styles.serviceBody}>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                  <div className={styles.serviceMeta}><Clock3 size={9} />{service.duration}</div>
                  <p className={styles.servicePrice}>{service.price}</p>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  {!publicView && <button type="button" className={styles.serviceButton} onClick={() => openServiceEditor(index)}>Editar servicio</button>}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {!showAllPosts && visibleSections.reviews && wrapper("reviews",
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sortableSectionHeader}>{!publicView && isSectionEditorOpen && <span className={styles.dragHandle} aria-hidden="true" title="Arrastrar sección"><GripVertical size={15} /></span>}<h2 className={styles.sectionTitle}>Reseñas <span className={styles.stars}>★ 4.9</span></h2></div>
            <button type="button" className={styles.sectionAction}>Ver todas →</button>
            {!publicView && <button type="button" className={styles.sectionHideAction} onClick={() => handleVisibility("reviews")}>Ocultar</button>}
          </div>
          <div className={styles.reviewsGrid}>
            {reviews.map((review) => (
              <article className={styles.review} key={review.name}>
                <div className={styles.reviewTop}>
                  <div className={styles.reviewAvatar}><Image src={review.image} alt={review.name} fill sizes="28px" /></div>
                  <div className={styles.reviewAuthor}><p className={styles.reviewName}>{review.name}</p><div className={styles.stars}>★★★★★</div></div>
                </div>
                <p className={styles.reviewText}>{review.text}</p>
                <span className={styles.reviewDate}>{review.date}</span>
              </article>
            ))}
          </div>
        </section>
      )}

      {!showAllPosts && visibleSections.gallery && wrapper("gallery",
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sortableSectionHeader}>{!publicView && isSectionEditorOpen && <span className={styles.dragHandle} aria-hidden="true" title="Arrastrar sección"><GripVertical size={15} /></span>}<h2 className={styles.sectionTitle}>Galería</h2></div>
            {!publicView && <><button type="button" className={styles.sectionAction}>Administrar galería →</button><button type="button" className={styles.sectionHideAction} onClick={() => handleVisibility("gallery")}>Ocultar</button></>}
          </div>
          <div className={styles.galleryGrid}>
            {gallery.map((image, index) => (
              <button type="button" className={styles.galleryItem} key={image} onClick={() => setGalleryIndex(index)} aria-label={`Abrir imagen de galería ${index + 1}`}>
                <Image src={image} alt={`Imagen de galería ${index + 1}`} fill sizes="(max-width: 600px) 25vw, 130px" />
              </button>
            ))}
          </div>
        </section>
      )}
    </>
  );
}