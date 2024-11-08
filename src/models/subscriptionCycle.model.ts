import { ESubscriptionCycle } from "./enums";

export interface ISubscriptionCycle {
    subscriptionCycleId?: number;
    cycle: ESubscriptionCycle;
    duration: number;


}

export default class SubscriptionCycle implements ISubscriptionCycle {
    public subscriptionCycleId!: number;
    public cycle!: ESubscriptionCycle;
    public duration!: number;
}
