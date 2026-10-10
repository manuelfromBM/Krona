import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CancelAppointmentUseCase } from '../application/usecases/cancel-appointment.usecase';
import { CreateAppointmentUseCase } from '../application/usecases/create-appointment.usecase';
import { CreateServiceUseCase } from '../application/usecases/create-service.usecase';
import { ListMyAppointmentsUseCase } from '../application/usecases/list-my-appointments.usecase';
import { ListProviderAppointmentsUseCase } from '../application/usecases/list-provider-appointments.usecase';
import { ListServicesUseCase } from '../application/usecases/list-services.usecase';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { CreateServiceDto } from '../dto/create-service.dto';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly createService: CreateServiceUseCase,
    private readonly listServices: ListServicesUseCase,
    private readonly createAppointment: CreateAppointmentUseCase,
    private readonly listMyAppointments: ListMyAppointmentsUseCase,
    private readonly listProviderAppointments: ListProviderAppointmentsUseCase,
    private readonly cancelAppointment: CancelAppointmentUseCase,
  ) {}

  @Post('services')
  async createServiceHandler(@Body() dto: CreateServiceDto) {
    const service = await this.createService.execute(dto);
    return service.toPublic();
  }

  @Get('services/provider/:providerId')
  async listServicesByProvider(@Param('providerId') providerId: string) {
    const services = await this.listServices.execute(providerId);
    return services.map((service) => service.toPublic());
  }

  @Post('appointments')
  async createAppointmentHandler(@Body() dto: CreateAppointmentDto) {
    const appointment = await this.createAppointment.execute(dto);
    return appointment.toPublic();
  }

  @Get('appointments/client/:clientId')
  async listAppointmentsByClient(@Param('clientId') clientId: string) {
    const appointments = await this.listMyAppointments.execute(clientId);
    return appointments.map((appointment) => appointment.toPublic());
  }

  @Get('appointments/provider/:providerId')
  async listAppointmentsByProvider(@Param('providerId') providerId: string) {
    const appointments =
      await this.listProviderAppointments.execute(providerId);
    return appointments.map((appointment) => appointment.toPublic());
  }

  @Post('appointments/:id/cancel')
  async cancelAppointmentHandler(
    @Param('id') id: string,
    @Body('requesterId') requesterId: string,
  ) {
    const appointment = await this.cancelAppointment.execute(id, requesterId);
    return appointment.toPublic();
  }
}
