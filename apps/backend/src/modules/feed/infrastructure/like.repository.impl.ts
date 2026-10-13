import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { LikeRepository } from '../domain/repositories/like.repository';

@Injectable()
export class PrismaLikeRepository implements LikeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async like(postId: string, userId: string): Promise<void> {
    await this.prisma.like.upsert({
      where: { postId_userId: { postId, userId } },
      create: { postId, userId },
      update: {},
    });
  }

  async unlike(postId: string, userId: string): Promise<void> {
    await this.prisma.like.deleteMany({ where: { postId, userId } });
  }

  async countByPost(postId: string): Promise<number> {
    return this.prisma.like.count({ where: { postId } });
  }

  async existsForUser(postId: string, userId: string): Promise<boolean> {
    const row = await this.prisma.like.findUnique({
      where: { postId_userId: { postId, userId } },
    });
    return !!row;
  }
}
