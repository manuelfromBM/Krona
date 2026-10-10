import { Injectable } from '@nestjs/common';
import { PrismaService as PrismaClientService } from '../../../infrastructure/database/prisma.service';
import { Appointment, AppointmentStatus } from '../domain/entities/appointment.entity';
import { AppointmentRepository } from '../domain/repositories/appointment.repository';

type AppointmentRow = {
  id: string;
  date: Date;
  status: AppointmentStatus;
  notes: string | null;
  clientId: string;
  providerId: string;
  serviceId: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private readonly prisma: PrismaClientService) {}

  async create(data: {
    date: Date;
    notes?: string;
    clientId: string;
    providerId: string;
    serviceId: string;
  }): Promise<Appointment> {
    const row = await this.prisma.appointment.create({
      data: {
        date: data.date,
        notes: data.notes,
        clientId: data.clientId,
        providerId: data.providerId,
        serviceId: data.serviceId,
      },
    });
    return this.toDomain(row);
  }

  async findById(id: string): Promise<Appointment | null> {
    const row = await this.prisma.appointment.findUnique({ where: { id } });
    return row ? this.toDomain(row) : null;
  }

  async findByClient(clientId: string): Promise<Appointment[]> {
    const rows = await this.prisma.appointment.findMany({
      where: { clientId },
      orderBy: { date: 'asc' },
    });
    return rows.map((row) => this.toDomain(row));
  }

  async findByProvider(providerId: string): Promise<Appointment[]> {
    const rows = await this.prisma.appointment.findMany({
      where: { providerId },
      orderBy: { date: 'asc' },
    });
    return rows.map((row) => this.toDomain(row));
  }

  async findByProviderAndDate(
    providerId: string,
    date: Date,
  ): Promise<Appointment[]> {
    const rows = await this.prisma.appointment.findMany({
      where: { providerId, date, status: { not: 'CANCELLED' } },
    });
    return rows.map((row) => this.toDomain(row));
  }

  async updateStatus(
    id: string,
    status: AppointmentStatus,
  ): Promise<Appointment> {
    const row = await this.prisma.appointment.update({
      where: { id },
      data: { status },
    });
    return this.toDomain(row);
  }

  private toDomain(row: AppointmentRow): Appointment {
    return new Appointment(
      row.id,
      row.date,
      row.status,
      row.notes,
      row.clientId,
      row.providerId,
      row.serviceId,
      row.createdAt,
      row.updatedAt,
    );
  }
}
