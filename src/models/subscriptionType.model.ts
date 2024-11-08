import { ESubscriptionType } from "./enums";

export interface ISubscriptionType {
    subscriptionTypeId?: number;
    type: ESubscriptionType;
    price: number;

}

export default class SubscriptionType implements ISubscriptionType {
    public subscriptionTypeId!: number;
    public type!: ESubscriptionType;
    public price!: number;
}
