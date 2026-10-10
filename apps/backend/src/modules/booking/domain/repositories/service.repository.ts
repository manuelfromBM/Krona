import { Service } from '../entities/service.entity';

export interface ServiceRepository {
  create(data: {
    name: string;
    description?: string;
    duration: number;
    price: number;
    providerId: string;
  }): Promise<Service>;
  findById(id: string): Promise<Service | null>;
  findByProvider(providerId: string): Promise<Service[]>;
}

export const SERVICE_REPOSITORY = Symbol('SERVICE_REPOSITORY');
