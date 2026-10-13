import { CreateServiceUseCase } from './create-service.usecase';
import { ServiceRepository } from '../../domain/repositories/service.repository';
import { Service } from '../../domain/entities/service.entity';
import { CreateServiceDto } from '../../dto/create-service.dto';

describe('CreateServiceUseCase', () => {
  let useCase: CreateServiceUseCase;
  let serviceRepository: ServiceRepository;

  beforeEach(() => {
    serviceRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByProvider: jest.fn(),
    };

    useCase = new CreateServiceUseCase(serviceRepository);
  });

  it('should create a service with the given data', async () => {
    const dto: CreateServiceDto = {
      name: 'Corte de pelo',
      description: 'Corte clásico',
      duration: 30,
      price: 15000,
      providerId: 'provider_1',
    };

    const expected = new Service(
      'service_1',
      dto.name,
      dto.description ?? null,
      dto.duration,
      dto.price,
      dto.providerId,
      new Date(),
    );

    jest.spyOn(serviceRepository, 'create').mockResolvedValue(expected);

    const result = await useCase.execute(dto);

    expect(result).toEqual(expected);
    expect(serviceRepository.create).toHaveBeenCalledWith({
      name: dto.name,
      description: dto.description,
      duration: dto.duration,
      price: dto.price,
      providerId: dto.providerId,
    });
  });

  it('should propagate errors from the repository', async () => {
    const dto: CreateServiceDto = {
      name: 'Manicure',
      duration: 45,
      price: 10000,
      providerId: 'provider_1',
    };

    jest
      .spyOn(serviceRepository, 'create')
      .mockRejectedValue(new Error('DB error'));

    await expect(useCase.execute(dto)).rejects.toThrow('DB error');
  });

  it('should pass through an undefined description', async () => {
    const dto: CreateServiceDto = {
      name: 'Masaje',
      duration: 60,
      price: 20000,
      providerId: 'provider_2',
    };

    jest.spyOn(serviceRepository, 'create').mockResolvedValue(
      new Service(
        'service_2',
        dto.name,
        null,
        dto.duration,
        dto.price,
        dto.providerId,
        new Date(),
      ),
    );

    await useCase.execute(dto);

    expect(serviceRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({ description: undefined }),
    );
  });
});
