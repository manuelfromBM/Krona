import { Body, Controller, Get, Param, Post, Delete, Query } from '@nestjs/common';
import { ListFeedUseCase } from '../application/usecases/list-feed.usecase';
import { CreatePostUseCase } from '../application/usecases/create-post.usecase';
import { LikePostUseCase } from '../application/usecases/like-post.usecase';
import { UnlikePostUseCase } from '../application/usecases/unlike-post.usecase';
import { CreateCommentUseCase } from '../application/usecases/create-comment.usecase';
import { ListCommentUseCase } from '../application/usecases/list-comment.usecase';
import { ListFeedDto } from '../dto/list-feed.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { FeedItem } from '../domain/repositories/post.repository';
import { CommentWithAuthor } from '../domain/repositories/comment.repository';

function initialsFromName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function toFeedResponse(item: FeedItem) {
  return {
    id: item.post.id,
    user: {
      id: item.author.id,
      username: item.author.name,
      initials: initialsFromName(item.author.name),
    },
    media: {
      type: item.post.mediaType,
      urls: item.post.mediaUrls,
      duration: item.post.duration ?? undefined,
    },
    likes: item.likesCount,
    likedByMe: item.likedByCurrentUser,
    caption: item.post.caption,
    commentsCount: item.commentsCount,
    createdAt: item.post.createdAt.toISOString(),
  };
}

function toCommentResponse({ comment, author }: CommentWithAuthor) {
  return {
    id: comment.id,
    username: author.name,
    text: comment.text,
    createdAt: comment.createdAt.toISOString(),
  };
}

@Controller('feed')
export class FeedController {
  constructor(
    private readonly listFeedUseCase: ListFeedUseCase,
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly likePostUseCase: LikePostUseCase,
    private readonly unlikePostUseCase: UnlikePostUseCase,
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly listCommentUseCase: ListCommentUseCase,
  ) {}

  @Get()
  async getFeed(@Query() dto: ListFeedDto) {
    const { items, nextCursor } = await this.listFeedUseCase.execute(dto);
    return { posts: items.map(toFeedResponse), nextCursor };
  }

  @Post('posts')
  async createPostHandler(@Body() dto: CreatePostDto) {
    const post = await this.createPostUseCase.execute(dto);
    return { id: post.id };
  }

  @Post('posts/:id/like')
  async likePostHandler(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ) {
    return this.likePostUseCase.execute(id, userId);
  }

  @Delete('posts/:id/like')
  async unlikePostHandler(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    return this.unlikePostUseCase.execute(id, userId);
  }

  @Get('posts/:id/comments')
  async listCommentsHandler(@Param('id') id: string) {
    const comments = await this.listCommentUseCase.execute(id);
    return comments.map(toCommentResponse);
  }

  @Post('posts/:id/comments')
  async createCommentHandler(
    @Param('id') id: string,
    @Body() dto: CreateCommentDto,
  ) {
    const comment = await this.createCommentUseCase.execute(id, dto);
    return {
      id: comment.id,
      text: comment.text,
      createdAt: comment.createdAt.toISOString(),
    };
  }
}
