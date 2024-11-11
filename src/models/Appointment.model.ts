import { EAppointmentStatus } from "./enums";

export interface IAppointment {
  appointmentId: number;
  visitorId: number;
  availabilityId: number;
  status: string;
  reason: string;
  dateAppointment: number;
  rejectionReason: string;
  postponedDate: number;
  cancellationReason: string;
}

export class Appointment implements IAppointment {
  public appointmentId!: number;
  public visitorId!: number;
  public availabilityId!: number;
  public status!: EAppointmentStatus;
  public reason!: string;
  public dateAppointment!: number;
  public rejectionReason!: string;
  public postponedDate!: number;
  public cancellationReason!: string;
}
