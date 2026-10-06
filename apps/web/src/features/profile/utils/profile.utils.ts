import type { Post } from "../../Feed/types/post.types";
import type { ProfilePostMock } from "../types/profile.types";

export const normalizeWhatsAppNumber = (phone: string) =>
  phone.replace(/\D/g, "").replace(/^0/, "56");

export const whatsappUrl = (phone: string) =>
  `https://wa.me/${normalizeWhatsAppNumber(phone)}`;

export const instagramUrl = (handle: string) =>
  `https://instagram.com/${handle.replace(/^@/, "").trim()}`;

export const mapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export const buildProfileFeedPosts = (
  posts: ProfilePostMock[],
  displayName: string,
  profileAvatar: string,
): Post[] =>
  posts.map((post, index) => ({
    id: post.id,
    user: {
      username: displayName,
      initials: displayName.slice(0, 2).toUpperCase(),
      verified: true,
      isFollowing: false,
      avatar: profileAvatar,
    },
    media: {
      type: "image",
      urls: [post.image],
    },
    likes: post.likes,
    likedBy: index % 2 === 0 ? "clientes de Mecánica C.S.M" : undefined,
    caption: post.caption,
    commentsCount: 4 + (index % 5) * 2,
    comments: [
      {
        id: post.id + "-comment-1",
        username: "Andrés R.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop",
        text: "Excelente trabajo, se nota la dedicación. 👌",
        createdAt: "1 h",
      },
      {
        id: post.id + "-comment-2",
        username: "Valentina M.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop",
        text: "Muy buena atención y resultado. 100% recomendado.",
        createdAt: "45 min",
      },
    ],
    createdAt: post.date,
  }));