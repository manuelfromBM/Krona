import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  clientId!: string;

  @IsString()
  serviceId!: string;

  @IsISO8601({}, { message: 'La fecha debe tener formato ISO 8601' })
  date!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
