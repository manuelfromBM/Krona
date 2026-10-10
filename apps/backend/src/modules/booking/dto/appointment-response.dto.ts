import { AppointmentStatus } from '../domain/entities/appointment.entity';

export class AppointmentResponseDto {
  id!: string;
  date!: Date;
  status!: AppointmentStatus;
  notes!: string | null;
  clientId!: string;
  providerId!: string;
  serviceId!: string;
}
