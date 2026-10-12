import { Inject, Injectable } from '@nestjs/common';
import {
  FeedItem,
  POST_REPOSITORY,
  PostRepository,
} from '../../domain/repositories/post.repository';
import { ListFeedDto } from '../../dto/list-feed.dto';

const DEFAULT_LIMIT = 10;

@Injectable()
export class ListFeedUseCase {
  constructor(
    @Inject(POST_REPOSITORY) private readonly posts: PostRepository,
  ) {}

  async execute(
    dto: ListFeedDto,
  ): Promise<{ items: FeedItem[]; nextCursor: string | null }> {
    return this.posts.listFeed({
      cursor: dto.cursor,
      limit: dto.limit ?? DEFAULT_LIMIT,
      currentUserId: dto.userId,
    });
  }
}
