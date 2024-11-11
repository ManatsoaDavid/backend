import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { IUser } from "../models/user.model";
import { SqUser } from "./SqUser";

import { SqAppointment } from "./SqAppointment";

@Table({
  tableName: "visitor",
  timestamps: false,
})
export class SqVisitor extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  visitorId!: number;

  @ForeignKey(() => SqUser)
  @Column
  userId!: number;

  @BelongsTo(() => SqUser, "userId")
  user!: IUser;

  @ForeignKey(() => SqAppointment)
  @Column
  appointmentId!: number;

  @BelongsTo(() => SqAppointment, "appointmentId")
  appointment!: SqAppointment;

  @Column
  address!: string;

  @HasMany(() => SqAppointment, { foreignKey: 'visitorId', as: 'visitorAppointments' })
  appointments!: SqAppointment[];

}

export default SqUser;
