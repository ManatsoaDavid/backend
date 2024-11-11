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
import SqAgenda from "./SqAgenda";
import SqAppointment from "./SqAppointment";
import { SqSubscription } from "./SqSubscription";
import { SqUser } from "./SqUser";

@Table({
  tableName: "practitioners",
  timestamps: true,
})
export class SqPractitioner extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  practitionerId!: number;

  @ForeignKey(() => SqUser)
  @Column
  userId!: number;

  @BelongsTo(() => SqUser, 'userId')
  user!: SqUser;


  @Column
  idCardImage!: string;

  @Column
  residenceCertificate!: string;

  @Column
  officeAddress!: string;

  @Column
  status!: string;

  @Column
  category!: string;

  @Column
  specialty!: string;

  @Column
  diploma!: string;

  @Column
  nationalOrder!: string;

  @Column
  registrationNumber!: string;

  @HasMany(() => SqAgenda)
  agendas!: SqAgenda[];

  // Relationship with subscriptions (a practitioner can have multiple subscriptions)
  @HasMany(() => SqSubscription)
  subscriptions!: SqSubscription[];

  @HasMany(() => SqAppointment, {
    foreignKey: 'practitionerId',
    as: 'practitionerAppointments'
  })
  appointments!: SqAppointment[];
}
export default SqPractitioner;
