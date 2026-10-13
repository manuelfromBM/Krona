import { Inject, Injectable } from '@nestjs/common';
import { Post } from '../../domain/entities/post.entity';
import {
  POST_REPOSITORY,
  PostRepository,
} from '../../domain/repositories/post.repository';
import { CreatePostDto } from '../../dto/create-post.dto';

@Injectable()
export class CreatePostUseCase {
  constructor(
    @Inject(POST_REPOSITORY) private readonly posts: PostRepository,
  ) {}

  async execute(dto: CreatePostDto): Promise<Post> {
    return this.posts.create({
      authorId: dto.authorId,
      caption: dto.caption,
      mediaType: dto.mediaType,
      mediaUrls: dto.mediaUrls,
      duration: dto.duration,
    });
  }
}
