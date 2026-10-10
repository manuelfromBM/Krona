import { ListMyAppointmentsUseCase } from './list-my-appointments.usecase';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment.entity';

describe('ListMyAppointmentsUseCase', () => {
  let useCase: ListMyAppointmentsUseCase;
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

    useCase = new ListMyAppointmentsUseCase(appointmentRepository);
  });

  it("should return the client's appointments", async () => {
    const appointments = [
      new Appointment(
        'appointment_1',
        new Date(),
        'PENDING',
        null,
        'client_1',
        'provider_1',
        'service_1',
        new Date(),
        new Date(),
      ),
    ];

    jest
      .spyOn(appointmentRepository, 'findByClient')
      .mockResolvedValue(appointments);

    const result = await useCase.execute('client_1');

    expect(result).toEqual(appointments);
    expect(appointmentRepository.findByClient).toHaveBeenCalledWith('client_1');
  });

  it('should return an empty array when the client has no appointments', async () => {
    jest.spyOn(appointmentRepository, 'findByClient').mockResolvedValue([]);

    const result = await useCase.execute('client_without_appointments');

    expect(result).toEqual([]);
  });
});
