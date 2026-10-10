import { Appointment, AppointmentStatus } from '../entities/appointment.entity';

export interface AppointmentRepository {
  create(data: {
    date: Date;
    notes?: string;
    clientId: string;
    providerId: string;
    serviceId: string;
  }): Promise<Appointment>;
  findById(id: string): Promise<Appointment | null>;
  findByClient(clientId: string): Promise<Appointment[]>;
  findByProvider(providerId: string): Promise<Appointment[]>;
  findByProviderAndDate(providerId: string, date: Date): Promise<Appointment[]>;
  updateStatus(id: string, status: AppointmentStatus): Promise<Appointment>;
}

export const APPOINTMENT_REPOSITORY = Symbol('APPOINTMENT_REPOSITORY');
