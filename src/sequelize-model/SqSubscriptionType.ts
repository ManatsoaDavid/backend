import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ESubscriptionType } from "../models/enums";
import { ISubscriptionType } from "../models/subscriptionType.model";
import { SqSubscription } from "./SqSubscription";


@Table({
    tableName: 'subscriptionTypes',
    timestamps: true,
})

export class SqSubscriptionType extends Model<ISubscriptionType> implements ISubscriptionType {
    @PrimaryKey
    @AutoIncrement
    @Column
    subscriptionTypeId!: number;

    @Column
    type!: ESubscriptionType;

    @Column(DataType.TEXT)
    description!: string;

    @Column
    price!: number;

    // Relation inverse (un type peut être lié à plusieurs abonnements)
    @HasMany(() => SqSubscription)
    subscriptions!: SqSubscription[];
  name: any;
}
