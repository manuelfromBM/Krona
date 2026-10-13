import { Inject, Injectable } from '@nestjs/common';
import { CreateServiceDto } from '../../dto/create-service.dto';
import { Service } from '../../domain/entities/service.entity';
import {
  SERVICE_REPOSITORY,
  ServiceRepository,
} from '../../domain/repositories/service.repository';

@Injectable()
export class CreateServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY) private readonly services: ServiceRepository,
  ) {}

  async execute(dto: CreateServiceDto): Promise<Service> {
    return this.services.create({
      name: dto.name,
      description: dto.description,
      duration: dto.duration,
      price: dto.price,
      providerId: dto.providerId,
    });
  }
}
