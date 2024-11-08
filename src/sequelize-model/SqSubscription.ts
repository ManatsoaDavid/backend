import { DataTypes } from "sequelize";
import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ISubscription } from "../models/subscription.model";
import SqPractitioner from "./SqPractitioner";
import { SqSubscriptionCycle } from "./SqSubscriptionCycle";
import { SqSubscriptionType } from "./SqSubscriptionType";


@Table({
    tableName: 'subscriptions',
    timestamps: true,
})

export class SqSubscription extends Model<ISubscription> implements ISubscription {
    @PrimaryKey
    @AutoIncrement
    @Column
    subscriptionId!: number;

    @ForeignKey(() => SqPractitioner)
    @Column
    practitionerId!: number;

    @ForeignKey(() => SqSubscriptionType)
    @Column
    subscriptionTypeId!: number;

    @ForeignKey(() => SqSubscriptionCycle)
    @Column
    subscriptionCycleId!: number;

    @Column(DataTypes.BIGINT)
    startDate!: number;

    @Column(DataTypes.BIGINT)
    endDate!: number;

    @Column
    status!: string;

    @Column
    amount!: number;

    // Relations
    @BelongsTo(() => SqSubscriptionType)
    type!: SqSubscriptionType;

    @BelongsTo(() => SqSubscriptionCycle)
    cycle!: SqSubscriptionCycle;

    @BelongsTo(() => SqPractitioner)
    practitioner!: SqPractitioner;
}
