import { Injectable } from '@nestjs/common';
import { PrismaService as PrismaClientService } from '../../../infrastructure/database/prisma.service';
import { Service } from '../domain/entities/service.entity';
import { ServiceRepository } from '../domain/repositories/service.repository';

type ServiceRow = {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price: number;
  providerId: string;
  createdAt: Date;
};

@Injectable()
export class PrismaServiceRepository implements ServiceRepository {
  constructor(private readonly prisma: PrismaClientService) {}

  async create(data: {
    name: string;
    description?: string;
    duration: number;
    price: number;
    providerId: string;
  }): Promise<Service> {
    const row = await this.prisma.service.create({
      data: {
        name: data.name,
        description: data.description,
        duration: data.duration,
        price: data.price,
        providerId: data.providerId,
      },
    });
    return this.toDomain(row);
  }

  async findById(id: string): Promise<Service | null> {
    const row = await this.prisma.service.findUnique({ where: { id } });
    return row ? this.toDomain(row) : null;
  }

  async findByProvider(providerId: string): Promise<Service[]> {
    const rows = await this.prisma.service.findMany({ where: { providerId } });
    return rows.map((row) => this.toDomain(row));
  }

  private toDomain(row: ServiceRow): Service {
    return new Service(
      row.id,
      row.name,
      row.description,
      row.duration,
      row.price,
      row.providerId,
      row.createdAt,
    );
  }
}
