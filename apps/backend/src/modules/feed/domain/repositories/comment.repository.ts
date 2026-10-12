import { Comment } from '../entities/comment.entity';

export interface CommentAuthorView {
  id: string;
  name: string;
}

export interface CommentWithAuthor {
  comment: Comment;
  author: CommentAuthorView;
}

export interface CommentRepository {
  create(data: {
    postId: string;
    authorId: string;
    text: string;
  }): Promise<Comment>;
  listByPost(postId: string): Promise<CommentWithAuthor[]>;
  countByPost(postId: string): Promise<number>;
}

export const COMMENT_REPOSITORY = Symbol('COMMENT_REPOSITORY');
