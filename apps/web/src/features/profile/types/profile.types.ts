import type { ComponentType } from "react";
import type { Post } from "../../Feed/types/post.types";

export interface ProfileData {
  name: string;
  secondName: string;
  commercialName: string;
  category: string;
  location: string;
  bio: string;
  phone: string;
  instagram: string;
  address: string;
  visibility: "Público" | "Privado";
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
}

export interface TeamMember {
  name: string;
  role: string;
  status: string;
  busy?: boolean;
  image: string;
}

export interface ProfileService {
  name: string;
  price: string;
  duration: string;
  description: string;
  image: string;
}

export interface ProfileReview {
  name: string;
  text: string;
  date: string;
  image: string;
}

export interface Highlight {
  label: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
}

export interface ProfilePostMock {
  id: string;
  image: string;
  caption: string;
  date: string;
  likes: number;
}

export type ProfileSectionKey = "team" | "services" | "reviews" | "gallery";
export type ProfileSectionOrderKey = "publications" | ProfileSectionKey;

export interface UserProfilePageProps {
  publicView?: boolean;
  profileUsername?: string;
  profileAvatar?: string;
}

export interface ProfileFeedData {
  posts: Post[];
  displayName: string;
  profileAvatar: string;
}