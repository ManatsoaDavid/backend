import { DataTypes } from "sequelize";
import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { SqAgenda } from "./SqAgenda";
@Table({
  tableName: "availabilities",
  timestamps: true,
  createdAt: false,
  updatedAt: false,
})
export class SqAvailability extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  availabilityId!: number;

  @ForeignKey(() => SqAgenda)
  @Column
  agendaId!: number;

  @BelongsTo(() => SqAgenda)
  agenda!: SqAgenda;

  @Column
  status!: string;

  @Column(DataTypes.BIGINT)
  date!: number;

  @Column(DataTypes.BIGINT)
  startTime!: number;

  @Column(DataTypes.BIGINT)
  endTime!: number;



}

export default SqAvailability;
