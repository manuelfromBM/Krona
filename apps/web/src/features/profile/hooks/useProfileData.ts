"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_VISIBLE_HIGHLIGHTS,
  DEFAULT_VISIBLE_SECTIONS,
  PROFILE_SECTION_ORDER,
  PROFILE_STORAGE_KEY,
} from "../constants/profile.constants";
import {
  defaultProfileData,
  profilePosts,
  services,
} from "../mocks/profile.mock";
import type {
  ProfileData,
  ProfileSectionKey,
  ProfileSectionOrderKey,
  ProfileService,
} from "../types/profile.types";
import { buildProfileFeedPosts } from "../utils/profile.utils";

export function useProfileData(
  publicView: boolean,
  profileUsername: string,
  profileAvatar: string,
) {
  const [profile, setProfile] = useState<ProfileData>(defaultProfileData);
  const [editableServices, setEditableServices] = useState<ProfileService[]>(services);
  const [visibleHighlights, setVisibleHighlights] = useState<Record<string, boolean>>(DEFAULT_VISIBLE_HIGHLIGHTS);
  const [visibleSections, setVisibleSections] =
    useState<Record<ProfileSectionKey, boolean>>(DEFAULT_VISIBLE_SECTIONS);
  const [sectionOrder, setSectionOrder] =
    useState<ProfileSectionOrderKey[]>([...PROFILE_SECTION_ORDER]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved);

      if (parsed.profile) {
        setProfile({
          ...defaultProfileData,
          ...parsed.profile,
          hours: { ...defaultProfileData.hours, ...parsed.profile.hours },
        });
      }
      if (parsed.services) setEditableServices(parsed.services);
      if (parsed.visibleHighlights) setVisibleHighlights(parsed.visibleHighlights);
      if (parsed.visibleSections) {
        setVisibleSections({ ...DEFAULT_VISIBLE_SECTIONS, ...parsed.visibleSections });
      }
      if (Array.isArray(parsed.sectionOrder)) {
        const storedOrder = parsed.sectionOrder.filter(
          (key: unknown): key is ProfileSectionOrderKey =>
            PROFILE_SECTION_ORDER.includes(key as ProfileSectionOrderKey),
        );
        const missingSections = PROFILE_SECTION_ORDER.filter((key) => !storedOrder.includes(key));
        setSectionOrder([...storedOrder, ...missingSections]);
      }
    } catch {
      // La vista utiliza los valores por defecto si localStorage no contiene datos válidos.
    }
  }, [publicView]);

  const saveAll = (
    nextProfile: ProfileData = profile,
    nextServices: ProfileService[] = editableServices,
    nextHighlights = visibleHighlights,
    nextSections = visibleSections,
    nextOrder = sectionOrder,
  ) => {
    setProfile(nextProfile);
    setEditableServices(nextServices);
    setVisibleHighlights(nextHighlights);
    setVisibleSections(nextSections);
    setSectionOrder(nextOrder);

    try {
      window.localStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify({
          profile: nextProfile,
          services: nextServices,
          visibleHighlights: nextHighlights,
          visibleSections: nextSections,
          sectionOrder: nextOrder,
        }),
      );
    } catch {
      // La persistencia demo es opcional si el navegador bloquea localStorage.
    }
  };

  const displayName = publicView
    ? profileUsername
    : profile.commercialName || [profile.name, profile.secondName].filter(Boolean).join(" ");

  const profileFeedPosts = useMemo(
    () => buildProfileFeedPosts(profilePosts, displayName, profileAvatar),
    [displayName, profileAvatar],
  );

  return {
    profile,
    setProfile,
    editableServices,
    setEditableServices,
    visibleHighlights,
    setVisibleHighlights,
    visibleSections,
    setVisibleSections,
    sectionOrder,
    setSectionOrder,
    displayName,
    profileFeedPosts,
    saveAll,
  };
}