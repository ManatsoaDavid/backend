import { ISubscriptionCycle } from "../models/subscriptionCycle.model";
import { SqSubscriptionCycle } from "../sequelize-model/SqSubscriptionCycle";
import { CustomError } from "../util/error";
import { ERROR_MESSAGES } from "../util/error-messages";

export class SubscriptionCycleService {
  public async createSubscriptionCycle(subscriptionCycleData: ISubscriptionCycle): Promise<ISubscriptionCycle> {
    try {
      const { cycle, duration } = subscriptionCycleData;

      if (!cycle || !duration) {
        throw new CustomError(400, ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
      }

      const subscriptionCycle = await SqSubscriptionCycle.create({
        cycle,
        duration,
      });

      return subscriptionCycle.get({ plain: true }) as ISubscriptionCycle;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(500, "");
      }
    }
  }

  public async getAllSubscriptionCycles(): Promise<ISubscriptionCycle[]> {
    try {
      const subscriptionCycles = await SqSubscriptionCycle.findAll();
      return subscriptionCycles.map((subscriptionCycle) => subscriptionCycle.get({ plain: true })) as ISubscriptionCycle[];
    } catch (error) {
      throw new CustomError(500, ERROR_MESSAGES.SUBSCRIPTION_CYCLE_FETCH_ERROR);
    }
  }

  public async getSubscriptionCycleById(subscriptionCycleId: number): Promise<ISubscriptionCycle> {
    try {
      const subscriptionCycle = await SqSubscriptionCycle.findByPk(subscriptionCycleId);
      if (!subscriptionCycle) {
        throw new CustomError(404, 'Subscription cycle not found');
      }
      return subscriptionCycle.get({ plain: true }) as ISubscriptionCycle;
    } catch (error) {
      throw error;
    }
  }

  public async updateSubscriptionCycle(subscriptionCycleId: number, subscriptionCycleData: Partial<ISubscriptionCycle>): Promise<ISubscriptionCycle> {
    try {
      const subscriptionCycle = await SqSubscriptionCycle.findByPk(subscriptionCycleId);
      if (!subscriptionCycle) {
        throw new CustomError(404, 'Subscription cycle not found');
      }
      await subscriptionCycle.update(subscriptionCycleData);
      return subscriptionCycle.get({ plain: true }) as ISubscriptionCycle;
    } catch (error) {
      throw error;
    }
  }

  public async deleteSubscriptionCycle(subscriptionCycleId: number): Promise<void> {
    try {
      const subscriptionCycle = await SqSubscriptionCycle.findByPk(subscriptionCycleId);
      if (!subscriptionCycle) {
        throw new CustomError(404, 'Subscription cycle not found');
      }
      await subscriptionCycle.destroy();
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(500, ERROR_MESSAGES.SUBSCRIPTION_CYCLE_DELETE_ERROR);
      }
    }
  }

  public async calculateEndDate(startDate: number, subscriptionCycleId: number): Promise<number> {
    try {
      const subscriptionCycle = await SqSubscriptionCycle.findByPk(subscriptionCycleId);
      if (!subscriptionCycle) {
        throw new CustomError(404, 'Subscription cycle not found');
      }

      const endDate = new Date(startDate);
      if (subscriptionCycle.cycle) {

        endDate.setDate(endDate.getDate() + (subscriptionCycle.duration));

      } else {
        throw new CustomError(500, "Invalid subscription cycle");
      }

      return endDate.getTime();
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(500, "Server error");
      }
    }
  }
}
