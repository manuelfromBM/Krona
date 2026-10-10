import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from '../../dto/create-appointment.dto';
import { Appointment } from '../../domain/entities/appointment.entity';
import {
  APPOINTMENT_REPOSITORY,
  AppointmentRepository,
} from '../../domain/repositories/appointment.repository';
import {
  SERVICE_REPOSITORY,
  ServiceRepository,
} from '../../domain/repositories/service.repository';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointments: AppointmentRepository,
    @Inject(SERVICE_REPOSITORY) private readonly services: ServiceRepository,
  ) {}

  async execute(dto: CreateAppointmentDto): Promise<Appointment> {
    const service = await this.services.findById(dto.serviceId);
    if (!service) {
      throw new NotFoundException('El servicio solicitado no existe');
    }

    const date = new Date(dto.date);

    // La agenda de un prestador no admite dos citas activas en el mismo horario exacto.
    const existing = await this.appointments.findByProviderAndDate(
      service.providerId,
      date,
    );
    if (existing.some((appointment) => appointment.blocksSchedule())) {
      throw new ConflictException(
        'El prestador ya tiene una cita agendada en ese horario',
      );
    }

    return this.appointments.create({
      date,
      notes: dto.notes,
      clientId: dto.clientId,
      providerId: service.providerId,
      serviceId: service.id,
    });
  }
}
