import { ListProviderAppointmentsUseCase } from './list-provider-appointments.usecase';
import { AppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/entities/appointment.entity';

describe('ListProviderAppointmentsUseCase', () => {
  let useCase: ListProviderAppointmentsUseCase;
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

    useCase = new ListProviderAppointmentsUseCase(appointmentRepository);
  });

  it("should return the provider's appointments", async () => {
    const appointments = [
      new Appointment(
        'appointment_1',
        new Date(),
        'CONFIRMED',
        null,
        'client_1',
        'provider_1',
        'service_1',
        new Date(),
        new Date(),
      ),
    ];

    jest
      .spyOn(appointmentRepository, 'findByProvider')
      .mockResolvedValue(appointments);

    const result = await useCase.execute('provider_1');

    expect(result).toEqual(appointments);
    expect(appointmentRepository.findByProvider).toHaveBeenCalledWith(
      'provider_1',
    );
  });

  it('should return an empty array when the provider has no appointments', async () => {
    jest.spyOn(appointmentRepository, 'findByProvider').mockResolvedValue([]);

    const result = await useCase.execute('provider_without_appointments');

    expect(result).toEqual([]);
  });
});
