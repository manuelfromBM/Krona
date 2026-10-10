import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Appointment } from '../../domain/entities/appointment.entity';
import {
  APPOINTMENT_REPOSITORY,
  AppointmentRepository,
} from '../../domain/repositories/appointment.repository';

@Injectable()
export class CancelAppointmentUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointments: AppointmentRepository,
  ) {}

  async execute(appointmentId: string, requesterId: string): Promise<Appointment> {
    const appointment = await this.appointments.findById(appointmentId);
    if (!appointment) {
      throw new NotFoundException('La cita no existe');
    }

    // Solo el cliente o el prestador involucrados pueden cancelar la cita.
    const isParticipant =
      appointment.clientId === requesterId ||
      appointment.providerId === requesterId;
    if (!isParticipant) {
      throw new ForbiddenException('No tienes permiso para cancelar esta cita');
    }

    if (!appointment.isCancellable()) {
      throw new ConflictException(
        'La cita ya está cancelada o completada y no puede modificarse',
      );
    }

    return this.appointments.updateStatus(appointmentId, 'CANCELLED');
  }
}
