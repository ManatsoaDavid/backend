import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

import { DataTypes } from "sequelize";
import { SqAvailability } from "./SqAvailability";
import { SqVisitor } from "./SqVisitor";

@Table({
  tableName: "appointments",
  createdAt: false,
  updatedAt: false,
})
export class SqAppointment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  appointmentId!: number;

  @ForeignKey(() => SqVisitor)
  @Column
  visitorId!: number;

  @BelongsTo(() => SqVisitor, { as: 'appointmentVisitor' })
  visitor!: SqVisitor;

  @ForeignKey(() => SqAvailability)
  @Column
  availabilityId!: number;

  @BelongsTo(() => SqAvailability, { foreignKey: 'availabilityId', as: 'practitionerAppointments' })
  availability!: SqAvailability;

  @Column(DataTypes.BIGINT)
  createdAt!: number;

  @Column(DataTypes.BIGINT)
  updatedAt!: number;

  @Column
  status!: string;

  @Column
  reason!: string;

  @Column(DataTypes.BIGINT)
  dateAppointment!: number;

  @Column
  rejectionReason?: string;

  @Column
  postponedDate?: number;

  @Column
  cancellationReason?: string;
}

export default SqAppointment;
