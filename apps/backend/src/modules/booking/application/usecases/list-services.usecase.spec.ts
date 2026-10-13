import { ListServicesUseCase } from './list-services.usecase';
import { ServiceRepository } from '../../domain/repositories/service.repository';
import { Service } from '../../domain/entities/service.entity';

describe('ListServicesUseCase', () => {
  let useCase: ListServicesUseCase;
  let serviceRepository: ServiceRepository;

  beforeEach(() => {
    serviceRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByProvider: jest.fn(),
    };

    useCase = new ListServicesUseCase(serviceRepository);
  });

  it('should return all services for a provider', async () => {
    const services = [
      new Service('service_1', 'Corte', null, 30, 15000, 'provider_1', new Date()),
      new Service('service_2', 'Barba', null, 15, 8000, 'provider_1', new Date()),
    ];

    jest.spyOn(serviceRepository, 'findByProvider').mockResolvedValue(services);

    const result = await useCase.execute('provider_1');

    expect(result).toEqual(services);
    expect(serviceRepository.findByProvider).toHaveBeenCalledWith('provider_1');
  });

  it('should return an empty array when the provider has no services', async () => {
    jest.spyOn(serviceRepository, 'findByProvider').mockResolvedValue([]);

    const result = await useCase.execute('provider_without_services');

    expect(result).toEqual([]);
  });
});
