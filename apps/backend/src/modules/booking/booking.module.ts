import { Module } from '@nestjs/common';
import { CancelAppointmentUseCase } from './application/usecases/cancel-appointment.usecase';
import { CreateAppointmentUseCase } from './application/usecases/create-appointment.usecase';
import { CreateServiceUseCase } from './application/usecases/create-service.usecase';
import { ListMyAppointmentsUseCase } from './application/usecases/list-my-appointments.usecase';
import { ListProviderAppointmentsUseCase } from './application/usecases/list-provider-appointments.usecase';
import { ListServicesUseCase } from './application/usecases/list-services.usecase';
import { APPOINTMENT_REPOSITORY } from './domain/repositories/appointment.repository';
import { SERVICE_REPOSITORY } from './domain/repositories/service.repository';
import { PrismaAppointmentRepository } from './infrastructure/appointment.repository.impl';
import { PrismaServiceRepository } from './infrastructure/service.repository.impl';
import { BookingController } from './presentation/booking.controller';

@Module({
  controllers: [BookingController],
  providers: [
    CreateServiceUseCase,
    ListServicesUseCase,
    CreateAppointmentUseCase,
    ListMyAppointmentsUseCase,
    ListProviderAppointmentsUseCase,
    CancelAppointmentUseCase,
    { provide: SERVICE_REPOSITORY, useClass: PrismaServiceRepository },
    { provide: APPOINTMENT_REPOSITORY, useClass: PrismaAppointmentRepository },
  ],
  exports: [SERVICE_REPOSITORY, APPOINTMENT_REPOSITORY],
})
export class BookingModule {}
