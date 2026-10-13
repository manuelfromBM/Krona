export type PostMediaType = 'image' | 'video' | 'carrusel';

export class Post {
  constructor(
    public readonly id: string,
    public readonly caption: string,
    public readonly mediaType: PostMediaType,
    public readonly mediaUrls: string[],
    public readonly duration: string | null,
    public readonly authorId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
