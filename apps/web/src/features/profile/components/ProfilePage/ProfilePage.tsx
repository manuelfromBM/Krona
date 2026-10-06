"use client";

import { useCallback } from "react";
import styles from "../../ProfilePage.module.css";
import { gallery, profileImage } from "../../mocks/profile.mock";
import { useProfileData } from "../../hooks/useProfileData";
import { useProfileSectionOrder } from "../../hooks/useProfileSectionOrder";
import { useProfileUI } from "../../hooks/useProfileUI";
import { ProfileHeader } from "../ProfileHeader/ProfileHeader";
import { ProfileModals } from "../ProfileModals/ProfileModals";
import { ProfileSections } from "../ProfileSections/ProfileSections";
import { ProfileSidebar } from "../ProfileSidebar/ProfileSidebar";
import type { ProfileSectionKey, UserProfilePageProps } from "../../types/profile.types";

export function ProfilePage({
  publicView = false,
  profileUsername = "Mecánica C.S.M",
  profileAvatar,
}: UserProfilePageProps) {
  const data = useProfileData(publicView, profileUsername, profileAvatar ?? profileImage);
  const ui = useProfileUI();

  const openSectionEditor = () => {
    if (publicView) return;
    ui.setIsSectionEditorOpen(true);
  };

  const saveSectionEditor = () => {
    if (publicView) return;
    data.saveAll(data.profile, data.editableServices, data.visibleHighlights, data.visibleSections, data.sectionOrder);
    ui.setIsSectionEditorOpen(false);
  };

  const toggleProfileSectionVisibility = (key: ProfileSectionKey, visible: boolean) => {
    if (!ui.isSectionEditorOpen) return;
    data.setVisibleSections((current) => ({ ...current, [key]: visible }));
  };

  const order = useProfileSectionOrder(
    publicView,
    ui.isSectionEditorOpen,
    data.sectionOrder,
    data.setSectionOrder,
    data.visibleSections,
  );

  const showPreviousImage = useCallback(() => {
    ui.setGalleryIndex((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length);
  }, [ui.setGalleryIndex]);

  const showNextImage = useCallback(() => {
    ui.setGalleryIndex((current) => current === null ? null : (current + 1) % gallery.length);
  }, [ui.setGalleryIndex]);

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileShell}>
        <ProfileHeader
            publicView={publicView}
            profile={data.profile}
            displayName={data.displayName}
            profileAvatar={profileAvatar ?? profileImage}
            onEdit={() => ui.setIsEditOpen(true)}
            visibleHighlights={data.visibleHighlights}
          />

        <div className={styles.contentArea}>
          <div className={styles.mainColumn}>
            <ProfileSections
              publicView={publicView}
              isSectionEditorOpen={ui.isSectionEditorOpen}
              profile={data.profile}
              editableServices={data.editableServices}
              visibleSections={data.visibleSections}
              sectionOrder={data.sectionOrder}
              profileFeedPosts={data.profileFeedPosts}
              showAllPosts={ui.showAllPosts}
              postPage={ui.postPage}
              setShowAllPosts={ui.setShowAllPosts}
              setPostPage={ui.setPostPage}
              openServiceEditor={ui.openServiceEditor}
              setGalleryIndex={ui.setGalleryIndex}
              saveAll={data.saveAll}
              visibleHighlights={data.visibleHighlights}
              getSectionClassName={order.getSectionClassName}
              getSectionTransform={order.getSectionTransform}
              handleSectionPointerDown={order.handleSectionPointerDown}
              sectionRefs={order.sectionRefs}
            />
          </div>

          <ProfileSidebar
            publicView={publicView}
            profile={data.profile}
            visibleSections={data.visibleSections}
            isSectionEditorOpen={ui.isSectionEditorOpen}
            openSectionEditor={openSectionEditor}
            saveSectionEditor={saveSectionEditor}
            toggleProfileSectionVisibility={toggleProfileSectionVisibility}
            onEdit={() => ui.setIsEditOpen(true)}
            saveAll={data.saveAll}
          />
        </div>
      </div>

      <ProfileModals
        publicView={publicView}
        isEditOpen={ui.isEditOpen}
        setIsEditOpen={ui.setIsEditOpen}
        isServiceEditOpen={ui.isServiceEditOpen}
        setIsServiceEditOpen={ui.setIsServiceEditOpen}
        editingServiceIndex={ui.editingServiceIndex}
        setEditableServices={data.setEditableServices}
        editableServices={data.editableServices}
        profile={data.profile}
        setProfile={data.setProfile}
        visibleHighlights={data.visibleHighlights}
        setVisibleHighlights={data.setVisibleHighlights}
        visibleSections={data.visibleSections}
        setVisibleSections={data.setVisibleSections}
        saveAll={data.saveAll}
        galleryIndex={ui.galleryIndex}
        closeGallery={ui.closeGallery}
        showPreviousImage={showPreviousImage}
        showNextImage={showNextImage}
      />
    </div>
  );
}