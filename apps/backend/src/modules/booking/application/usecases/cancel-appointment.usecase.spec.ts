import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CancelAppointmentUseCase } from './cancel-appointment.usecase';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment.entity';

describe('CancelAppointmentUseCase', () => {
  let useCase: CancelAppointmentUseCase;
  let appointmentRepository: AppointmentRepository;

  beforeEach(() => {
    appointmentRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByClient: jest.fn(),
      findByProvider: jest.fn(),
      findByProviderAndDate: jest.fn(),
      updateStatus: jest.fn(),
    };

    useCase = new CancelAppointmentUseCase(appointmentRepository);
  });

  const buildAppointment = (status: Appointment['status']) =>
    new Appointment(
      'appointment_1',
      new Date(),
      status,
      null,
      'client_1',
      'provider_1',
      'service_1',
      new Date(),
      new Date(),
    );

  it('should cancel a pending appointment when requested by the client', async () => {
    const appointment = buildAppointment('PENDING');
    const cancelled = buildAppointment('CANCELLED');

    jest.spyOn(appointmentRepository, 'findById').mockResolvedValue(appointment);
    jest
      .spyOn(appointmentRepository, 'updateStatus')
      .mockResolvedValue(cancelled);

    const result = await useCase.execute('appointment_1', 'client_1');

    expect(result).toEqual(cancelled);
    expect(appointmentRepository.updateStatus).toHaveBeenCalledWith(
      'appointment_1',
      'CANCELLED',
    );
  });

  it('should cancel a confirmed appointment when requested by the provider', async () => {
    const appointment = buildAppointment('CONFIRMED');
    const cancelled = buildAppointment('CANCELLED');

    jest.spyOn(appointmentRepository, 'findById').mockResolvedValue(appointment);
    jest
      .spyOn(appointmentRepository, 'updateStatus')
      .mockResolvedValue(cancelled);

    const result = await useCase.execute('appointment_1', 'provider_1');

    expect(result).toEqual(cancelled);
  });

  it('should throw NotFoundException when the appointment does not exist', async () => {
    jest.spyOn(appointmentRepository, 'findById').mockResolvedValue(null);

    await expect(
      useCase.execute('missing_appointment', 'client_1'),
    ).rejects.toThrow(NotFoundException);
    expect(appointmentRepository.updateStatus).not.toHaveBeenCalled();
  });

  it('should throw ForbiddenException when the requester is not a participant', async () => {
    const appointment = buildAppointment('PENDING');

    jest.spyOn(appointmentRepository, 'findById').mockResolvedValue(appointment);

    await expect(
      useCase.execute('appointment_1', 'stranger'),
    ).rejects.toThrow(ForbiddenException);
    expect(appointmentRepository.updateStatus).not.toHaveBeenCalled();
  });

  it('should throw ConflictException when the appointment is already cancelled', async () => {
    const appointment = buildAppointment('CANCELLED');

    jest.spyOn(appointmentRepository, 'findById').mockResolvedValue(appointment);

    await expect(
      useCase.execute('appointment_1', 'client_1'),
    ).rejects.toThrow(ConflictException);
    expect(appointmentRepository.updateStatus).not.toHaveBeenCalled();
  });

  it('should throw ConflictException when the appointment is already completed', async () => {
    const appointment = buildAppointment('COMPLETED');

    jest.spyOn(appointmentRepository, 'findById').mockResolvedValue(appointment);

    await expect(
      useCase.execute('appointment_1', 'provider_1'),
    ).rejects.toThrow(ConflictException);
  });
});
