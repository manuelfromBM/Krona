import { IsInt, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MinLength(2, { message: 'El nombre del servicio es muy corto' })
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt({ message: 'La duración debe ser en minutos' })
  @Min(5, { message: 'La duración mínima es de 5 minutos' })
  duration!: number;

  @IsNumber()
  @Min(0, { message: 'El precio no puede ser negativo' })
  price!: number;

  @IsString()
  providerId!: string;
}
