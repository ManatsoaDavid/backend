export interface ISubscription {
    subscriptionId?: number;
    practitionerId: number;
    subscriptionCycleId: number;
    subscriptionTypeId: number;
    startDate: number;
    endDate: number;
    status: string
    amount:number
}

export default class Subscription implements ISubscription {
    public subscriptionId!: number;
    public practitionerId!: number;
    public subscriptionCycleId!: number;
    public subscriptionTypeId!: number;
    public startDate!: number;
    public endDate!: number;
    public status!: string;
    public amount!: number;
}
