export interface LikeRepository {
  like(postId: string, userId: string): Promise<void>;
  unlike(postId: string, userId: string): Promise<void>;
  countByPost(postId: string): Promise<number>;
  existsForUser(postId: string, userId: string): Promise<boolean>;
}

export const LIKE_REPOSITORY = Symbol('LIKE_REPOSITORY');
