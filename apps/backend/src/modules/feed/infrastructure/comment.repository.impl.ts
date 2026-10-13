import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { Comment } from '../domain/entities/comment.entity';
import {
  CommentRepository,
  CommentWithAuthor,
} from '../domain/repositories/comment.repository';

type CommentRow = {
  id: string;
  text: string;
  postId: string;
  authorId: string;
  createdAt: Date;
};

@Injectable()
export class PrismaCommentRepository implements CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    postId: string;
    authorId: string;
    text: string;
  }): Promise<Comment> {
    const row = await this.prisma.comment.create({ data });
    return this.toDomain(row);
  }

  async listByPost(postId: string): Promise<CommentWithAuthor[]> {
    const rows = await this.prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'asc' },
      include: { author: { select: { id: true, name: true } } },
    });
    return rows.map((row) => ({
      comment: this.toDomain(row),
      author: row.author,
    }));
  }

  async countByPost(postId: string): Promise<number> {
    return this.prisma.comment.count({ where: { postId } });
  }

  private toDomain(row: CommentRow): Comment {
    return new Comment(row.id, row.text, row.postId, row.authorId, row.createdAt);
  }
}
