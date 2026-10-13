
import { apiClient } from "@/lib/api-client";

// Tipos que representan la respuesta del backend NestJS
export interface FeedPostResponse {
  id: string;
  caption: string;
  likes: number;
  likedByMe: boolean;
  commentsCount: number;
  createdAt: string;

  media: {
    type: "image" | "video" | "carrusel";
    urls: string[];
    duration?: string;
  };

  user: {
    id: string;
    username: string;
    initials: string;
  };
}

export interface FeedResponse {
  posts: FeedPostResponse[];
  nextCursor: string | null;
}

// Obtener publicaciones del feed
export function getFeed(): Promise<FeedResponse> {
  return apiClient.get<FeedResponse>("/feed");
}

// Crear una publicación
export interface CreatePostData {
  caption: string;
  media: {
    type: "image" | "video" | "carrusel";
    urls: string[];
    duration?: string;
  };
}

export function createPost(data: CreatePostData) {
  return apiClient.post("/feed/posts", data);
}

// Dar like a una publicación
export function likePost(postId: string, userId: string) {
  return apiClient.post(
    `/feed/posts/${postId}/like`,
    { userId }
  );
}

// Quitar like
export function unlikePost(postId: string, userId: string) {
  return apiClient.delete(
    `/feed/posts/${postId}/like?userId=${encodeURIComponent(userId)}`
  );
}

// Obtener comentarios de una publicación
export function getPostComments(postId: string) {
  return apiClient.get(
    `/feed/posts/${postId}/comments`
  );
}

// Crear un comentario
export interface CreateCommentData {
  userId: string;
  text: string;
}

export function createComment(
  postId: string,
  data: CreateCommentData
) {
  return apiClient.post(
    `/feed/posts/${postId}/comments`,
    data
  );
}
