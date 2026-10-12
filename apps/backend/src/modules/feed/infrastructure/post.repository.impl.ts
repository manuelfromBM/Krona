import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { Post, PostMediaType } from '../domain/entities/post.entity';
import {
  CreatePostData,
  FeedItem,
  PostRepository,
} from '../domain/repositories/post.repository';

type PostRow = {
  id: string;
  caption: string;
  mediaType: string;
  mediaUrls: string[];
  duration: string | null;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PrismaPostRepository implements PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePostData): Promise<Post> {
    const row = await this.prisma.post.create({
      data: {
        caption: data.caption,
        mediaType: data.mediaType,
        mediaUrls: data.mediaUrls,
        duration: data.duration,
        authorId: data.authorId,
      },
    });
    return this.toDomain(row);
  }

  async findById(id: string): Promise<Post | null> {
    const row = await this.prisma.post.findUnique({ where: { id } });
    return row ? this.toDomain(row) : null;
  }

  async listFeed(params: {
    cursor?: string;
    limit: number;
    currentUserId?: string;
  }): Promise<{ items: FeedItem[]; nextCursor: string | null }> {
    const rows = await this.prisma.post.findMany({
      take: params.limit + 1,
      ...(params.cursor ? { cursor: { id: params.cursor }, skip: 1 } : {}),
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, name: true } },
        _count: { select: { likes: true, comments: true } },
        likes: params.currentUserId
          ? { where: { userId: params.currentUserId }, select: { id: true } }
          : false,
      },
    });

    const hasMore = rows.length > params.limit;
    const page = hasMore ? rows.slice(0, params.limit) : rows;

    const items: FeedItem[] = page.map((row) => ({
      post: this.toDomain(row),
      author: row.author,
      likesCount: row._count.likes,
      commentsCount: row._count.comments,
      likedByCurrentUser: Array.isArray(row.likes) && row.likes.length > 0,
    }));

    return {
      items,
      nextCursor: hasMore ? page[page.length - 1].id : null,
    };
  }

  private toDomain(row: PostRow): Post {
    return new Post(
      row.id,
      row.caption,
      row.mediaType as PostMediaType,
      row.mediaUrls,
      row.duration,
      row.authorId,
      row.createdAt,
      row.updatedAt,
    );
  }
}
