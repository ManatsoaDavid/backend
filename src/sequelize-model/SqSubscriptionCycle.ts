import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ESubscriptionCycle } from "../models/enums";
import { ISubscriptionCycle } from "../models/subscriptionCycle.model";
import { SqSubscription } from "./SqSubscription";


@Table({
    tableName: 'subscriptionCycles',
    timestamps: true
})

export class SqSubscriptionCycle extends Model<ISubscriptionCycle> implements ISubscriptionCycle {
    @PrimaryKey
    @AutoIncrement
    @Column
    subscriptionCycleId!: number;

    @Column
    cycle!: ESubscriptionCycle;

    @Column
    duration!: number;

    // Relation inverse (un type peut être lié à plusieurs abonnements)
    @HasMany(() => SqSubscription)
    subscriptions!: SqSubscription[];

}
