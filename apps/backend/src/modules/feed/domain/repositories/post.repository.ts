import { Post, PostMediaType } from '../entities/post.entity';

export interface PostAuthorView {
  id: string;
  name: string;
}

export interface FeedItem {
  post: Post;
  author: PostAuthorView;
  likesCount: number;
  commentsCount: number;
  likedByCurrentUser: boolean;
}

export interface CreatePostData {
  authorId: string;
  caption: string;
  mediaType: PostMediaType;
  mediaUrls: string[];
  duration?: string;
}

export interface PostRepository {
  create(data: CreatePostData): Promise<Post>;
  findById(id: string): Promise<Post | null>;
  listFeed(params: {
    cursor?: string;
    limit: number;
    currentUserId?: string;
  }): Promise<{ items: FeedItem[]; nextCursor: string | null }>;
}

export const POST_REPOSITORY = Symbol('POST_REPOSITORY');
