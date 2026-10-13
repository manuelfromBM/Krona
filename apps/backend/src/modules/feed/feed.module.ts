import { Module } from '@nestjs/common';
import { ListFeedUseCase } from './application/usecases/list-feed.usecase';
import { CreatePostUseCase } from './application/usecases/create-post.usecase';
import { LikePostUseCase } from './application/usecases/like-post.usecase';
import { UnlikePostUseCase } from './application/usecases/unlike-post.usecase';
import { CreateCommentUseCase } from './application/usecases/create-comment.usecase';
import { ListCommentUseCase } from './application/usecases/list-comment.usecase';
import { POST_REPOSITORY } from './domain/repositories/post.repository';
import { COMMENT_REPOSITORY } from './domain/repositories/comment.repository';
import { LIKE_REPOSITORY } from './domain/repositories/like.repository';
import { PrismaPostRepository } from './infrastructure/post.repository.impl';
import { PrismaCommentRepository } from './infrastructure/comment.repository.impl';
import { PrismaLikeRepository } from './infrastructure/like.repository.impl';
import { FeedController } from './presentation/feed.controller';

@Module({
  controllers: [FeedController],
  providers: [
    ListFeedUseCase,
    CreatePostUseCase,
    LikePostUseCase,
    UnlikePostUseCase,
    CreateCommentUseCase,
    ListCommentUseCase,
    { provide: POST_REPOSITORY, useClass: PrismaPostRepository },
    { provide: COMMENT_REPOSITORY, useClass: PrismaCommentRepository },
    { provide: LIKE_REPOSITORY, useClass: PrismaLikeRepository },
  ],
  exports: [POST_REPOSITORY, COMMENT_REPOSITORY, LIKE_REPOSITORY],
})
export class FeedModule {}
