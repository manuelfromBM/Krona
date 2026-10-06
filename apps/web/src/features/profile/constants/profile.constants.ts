import type { ProfileSectionKey, ProfileSectionOrderKey } from "../types/profile.types";

export const PROFILE_STORAGE_KEY = "krona-profile-demo";

export const PROFILE_SECTION_KEYS: ProfileSectionKey[] = [
  "team",
  "services",
  "reviews",
  "gallery",
];

export const PROFILE_SECTION_ORDER: ProfileSectionOrderKey[] = [
  "publications",
  "team",
  "services",
  "reviews",
  "gallery",
];

export const POSTS_PER_PAGE = 6;

export const DEFAULT_VISIBLE_HIGHLIGHTS: Record<string, boolean> = {
  Trabajos: true,
  Servicios: true,
  Frenos: true,
  Equipo: true,
  Ubicación: true,
};

export const DEFAULT_VISIBLE_SECTIONS: Record<ProfileSectionKey, boolean> = {
  team: true,
  services: true,
  reviews: true,
  gallery: true,
};