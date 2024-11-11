import { ISubscriptionType } from "../models/subscriptionType.model";
import { SqSubscriptionType } from "../sequelize-model/SqSubscriptionType";
import { CustomError } from "../util/error";
import { ERROR_MESSAGES } from "../util/error-messages";

export class SubscriptionTypeService {
  public async createSubscriptionType(subscriptionTypeData: ISubscriptionType): Promise<ISubscriptionType> {
    try {
      const { type, price, description } = subscriptionTypeData;

      if (!type || !price) {
        throw new CustomError(400, ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
      }

      const subscriptionType = await SqSubscriptionType.create({
        type,
        description,
        price,
      });

      return subscriptionType.get({ plain: true }) as ISubscriptionType;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(500, ERROR_MESSAGES.SUBSCRIPTION_TYPE_CREATE_ERROR);
      }
    }
  }

  public async getAllSubscriptionTypes(): Promise<ISubscriptionType[]> {
    try {
      const subscriptionTypes = await SqSubscriptionType.findAll();
      return subscriptionTypes.map((subscriptionType) => subscriptionType.get({ plain: true })) as ISubscriptionType[];
    } catch (error) {
      throw new CustomError(500, ERROR_MESSAGES.SUBSCRIPTION_TYPE_FETCH_ERROR);
    }
  }

  public async getSubscriptionTypeById(subscriptionTypeId: number): Promise<ISubscriptionType> {
    try {
      const subscriptionType = await SqSubscriptionType.findByPk(subscriptionTypeId);
      if (!subscriptionType) {
        throw new CustomError(404, 'Subscription type not found');
      }
      return subscriptionType.get({ plain: true }) as ISubscriptionType;
    } catch (error) {
      throw error;
    }
  }

  public async updateSubscriptionType(subscriptionTypeId: number, subscriptionTypeData: Partial<ISubscriptionType>): Promise<ISubscriptionType> {
    try {
      const subscriptionType = await SqSubscriptionType.findByPk(subscriptionTypeId);
      if (!subscriptionType) {
        throw new CustomError(404, 'Subscription type not found');
      }
      await subscriptionType.update(subscriptionTypeData);
      return subscriptionType.get({ plain: true }) as ISubscriptionType;
    } catch (error) {
      throw error;
    }
  }

  public async deleteSubscriptionType(subscriptionTypeId: number): Promise<void> {
    try {
      const subscriptionType = await SqSubscriptionType.findByPk(subscriptionTypeId);
      if (!subscriptionType) {
        throw new CustomError(404, 'Subscription type not found');
      }
      await subscriptionType.destroy();
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(500, ERROR_MESSAGES.SUBSCRIPTION_TYPE_DELETE_ERROR);
      }
    }
  }
}
