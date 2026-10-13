import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { PostMediaType } from '../domain/entities/post.entity';

export class CreatePostDto {
  @IsString()
  authorId!: string;

  @IsString()
  @MinLength(1, { message: 'La publicación necesita una descripción' })
  caption!: string;

  @IsIn(['image', 'video', 'carrusel'])
  mediaType!: PostMediaType;

  @IsArray()
  @ArrayMinSize(1, { message: 'La publicación necesita al menos un archivo' })
  @IsString({ each: true })
  mediaUrls!: string[];

  @IsOptional()
  @IsString()
  duration?: string;
}
