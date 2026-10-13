import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  LIKE_REPOSITORY,
  LikeRepository,
} from '../../domain/repositories/like.repository';
import {
  POST_REPOSITORY,
  PostRepository,
} from '../../domain/repositories/post.repository';

@Injectable()
export class LikePostUseCase {
  constructor(
    @Inject(LIKE_REPOSITORY) private readonly likes: LikeRepository,
    @Inject(POST_REPOSITORY) private readonly posts: PostRepository,
  ) {}

  async execute(postId: string, userId: string): Promise<{ likesCount: number }> {
    const post = await this.posts.findById(postId);
    if (!post) {
      throw new NotFoundException('La publicación no existe');
    }

    await this.likes.like(postId, userId);
    const likesCount = await this.likes.countByPost(postId);
    return { likesCount };
  }
}
