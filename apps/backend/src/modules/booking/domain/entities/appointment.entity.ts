export type AppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED';

export class Appointment {
  constructor(
    public readonly id: string,
    public readonly date: Date,
    public readonly status: AppointmentStatus,
    public readonly notes: string | null,
    public readonly clientId: string,
    public readonly providerId: string,
    public readonly serviceId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  // Una cita solo puede cancelarse si aún no se completó ni fue cancelada antes.
  isCancellable(): boolean {
    return this.status === 'PENDING' || this.status === 'CONFIRMED';
  }

  // Ocupa la agenda del prestador salvo que ya haya sido cancelada.
  blocksSchedule(): boolean {
    return this.status !== 'CANCELLED';
  }

  toPublic() {
    return {
      id: this.id,
      date: this.date,
      status: this.status,
      notes: this.notes,
      clientId: this.clientId,
      providerId: this.providerId,
      serviceId: this.serviceId,
    };
  }
}
