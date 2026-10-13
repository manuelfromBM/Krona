import { Inject, Injectable } from '@nestjs/common';
import { Service } from '../../domain/entities/service.entity';
import {
  SERVICE_REPOSITORY,
  ServiceRepository,
} from '../../domain/repositories/service.repository';

@Injectable()
export class ListServicesUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY) private readonly services: ServiceRepository,
  ) {}

  async execute(providerId: string): Promise<Service[]> {
    return this.services.findByProvider(providerId);
  }
}
