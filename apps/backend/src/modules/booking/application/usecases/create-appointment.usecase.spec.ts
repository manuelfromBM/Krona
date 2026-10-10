import { CreateAppointmentUseCase } from './create-appointment.usecase';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { ServiceRepository } from '../../domain/repositories/service.repository';
import { Appointment } from '../../domain/entities/appointment.entity';
import { Service } from '../../domain/entities/service.entity';
import { CreateAppointmentDto } from '../../dto/create-appointment.dto';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('CreateAppointmentUseCase', () => {
  let useCase: CreateAppointmentUseCase;
  let appointmentRepository: AppointmentRepository;
  let serviceRepository: ServiceRepository;

  const service = new Service(
    'service_1',
    'Corte de pelo',
    null,
    30,
    15000,
    'provider_1',
    new Date(),
  );

  const dto: CreateAppointmentDto = {
    clientId: 'client_1',
    serviceId: 'service_1',
    date: '2026-11-01T10:00:00.000Z',
  };

  beforeEach(() => {
    appointmentRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByClient: jest.fn(),
      findByProvider: jest.fn(),
      findByProviderAndDate: jest.fn(),
      updateStatus: jest.fn(),
    };

    serviceRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByProvider: jest.fn(),
    };

    useCase = new CreateAppointmentUseCase(
      appointmentRepository,
      serviceRepository,
    );
  });

  it('should create an appointment when the slot is free', async () => {
    const expected = new Appointment(
      'appointment_1',
      new Date(dto.date),
      'PENDING',
      null,
      dto.clientId,
      service.providerId,
      service.id,
      new Date(),
      new Date(),
    );

    jest.spyOn(serviceRepository, 'findById').mockResolvedValue(service);
    jest
      .spyOn(appointmentRepository, 'findByProviderAndDate')
      .mockResolvedValue([]);
    jest.spyOn(appointmentRepository, 'create').mockResolvedValue(expected);

    const result = await useCase.execute(dto);

    expect(result).toEqual(expected);
    expect(appointmentRepository.create).toHaveBeenCalledWith({
      date: new Date(dto.date),
      notes: dto.notes,
      clientId: dto.clientId,
      providerId: service.providerId,
      serviceId: service.id,
    });
  });

  it('should throw NotFoundException when the service does not exist', async () => {
    jest.spyOn(serviceRepository, 'findById').mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrow(NotFoundException);
    expect(appointmentRepository.create).not.toHaveBeenCalled();
  });

  it('should throw ConflictException when the provider already has an active appointment at that time', async () => {
    const conflicting = new Appointment(
      'appointment_existing',
      new Date(dto.date),
      'CONFIRMED',
      null,
      'other_client',
      service.providerId,
      service.id,
      new Date(),
      new Date(),
    );

    jest.spyOn(serviceRepository, 'findById').mockResolvedValue(service);
    jest
      .spyOn(appointmentRepository, 'findByProviderAndDate')
      .mockResolvedValue([conflicting]);

    await expect(useCase.execute(dto)).rejects.toThrow(ConflictException);
    expect(appointmentRepository.create).not.toHaveBeenCalled();
  });

  it('should allow booking when the existing appointment at that time was cancelled', async () => {
    const cancelled = new Appointment(
      'appointment_cancelled',
      new Date(dto.date),
      'CANCELLED',
      null,
      'other_client',
      service.providerId,
      service.id,
      new Date(),
      new Date(),
    );

    const expected = new Appointment(
      'appointment_2',
      new Date(dto.date),
      'PENDING',
      null,
      dto.clientId,
      service.providerId,
      service.id,
      new Date(),
      new Date(),
    );

    jest.spyOn(serviceRepository, 'findById').mockResolvedValue(service);
    jest
      .spyOn(appointmentRepository, 'findByProviderAndDate')
      .mockResolvedValue([cancelled]);
    jest.spyOn(appointmentRepository, 'create').mockResolvedValue(expected);

    const result = await useCase.execute(dto);

    expect(result).toEqual(expected);
  });
});
