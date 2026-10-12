import { Inject, Injectable } from '@nestjs/common';
import {
  COMMENT_REPOSITORY,
  CommentRepository,
  CommentWithAuthor,
} from '../../domain/repositories/comment.repository';

@Injectable()
export class ListCommentUseCase {
  constructor(
    @Inject(COMMENT_REPOSITORY) private readonly comments: CommentRepository,
  ) {}

  async execute(postId: string): Promise<CommentWithAuthor[]> {
    return this.comments.listByPost(postId);
  }
}
