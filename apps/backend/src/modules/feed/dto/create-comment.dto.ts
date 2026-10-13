import { IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  authorId!: string;

  @IsString()
  @MinLength(1, { message: 'El comentario no puede estar vacío' })
  text!: string;
}
