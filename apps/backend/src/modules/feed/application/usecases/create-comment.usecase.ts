import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentWithAuthor } from '../../domain/repositories/comment.repository';
import {
  COMMENT_REPOSITORY,
  CommentRepository,
} from '../../domain/repositories/comment.repository';
import {
  POST_REPOSITORY,
  PostRepository,
} from '../../domain/repositories/post.repository';
import { CreateCommentDto } from '../../dto/create-comment.dto';

@Injectable()
export class CreateCommentUseCase {
  constructor(
    @Inject(COMMENT_REPOSITORY) private readonly comments: CommentRepository,
    @Inject(POST_REPOSITORY) private readonly posts: PostRepository,
  ) {}

  async execute(postId: string, dto: CreateCommentDto): Promise<CommentWithAuthor['comment']> {
    const post = await this.posts.findById(postId);
    if (!post) {
      throw new NotFoundException('La publicación no existe');
    }

    return this.comments.create({
      postId,
      authorId: dto.authorId,
      text: dto.text,
    });
  }
}
