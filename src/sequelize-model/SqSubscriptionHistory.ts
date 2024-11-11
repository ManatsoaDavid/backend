import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { SqSubscription } from "./SqSubscription";
import { DataTypes } from "sequelize";

@Table({
  tableName: "subscription_history",
  timestamps: false
})
export class SqSubscriptionHistory extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  historyId!: number;

  @ForeignKey(() => SqSubscription)
  @Column
  subscriptionId!: number;

  @Column
  field!: string;

  @Column(DataTypes.TEXT)
  oldValue!: string | null;

  @Column(DataTypes.TEXT)
  newValue!: string;

  @Column(DataTypes.BIGINT)
  changeDate!: number;

  @BelongsTo(() => SqSubscription)
  subscription!: SqSubscription;
}
