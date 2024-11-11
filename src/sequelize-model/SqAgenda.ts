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


import Availability, { SqAvailability } from "./SqAvailability";
import { SqPractitioner } from "./SqPractitioner";

@Table({
  tableName: "agenda",
  timestamps: false,
})
export class SqAgenda extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  agendaId!: number;

  @ForeignKey(() => SqPractitioner)
  @Column
  practitionerId!: number;


  @Column
  category!: string;

  @HasMany(() => SqAvailability, {
    foreignKey: 'agendaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  availabilities!: SqAvailability[];


  @BelongsTo(() => SqPractitioner)
  practitioner!: SqPractitioner;
}

export default SqAgenda;
