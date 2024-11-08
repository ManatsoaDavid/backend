import { EAvailabilityStatus } from "./enums";

export interface IAvailability {
  availabilityId: number;
  status: string;
  date: number;
  startTime: number;
  endTime: number;
}

export class Availability implements IAvailability {
  public availabilityId!: number;
  public status!: EAvailabilityStatus;
  public date!: number;
  public startTime!: number;
  public endTime!: number;
}
