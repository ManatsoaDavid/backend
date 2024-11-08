import { Op } from "sequelize";
import { ISubscription } from '../models/subscription.model';
import SqPractitioner from "../sequelize-model/SqPractitioner";
import { SqSubscription } from "../sequelize-model/SqSubscription";
import { SqSubscriptionCycle } from "../sequelize-model/SqSubscriptionCycle";
import { SqSubscriptionType } from "../sequelize-model/SqSubscriptionType";
import { CustomError } from "../util/error";
import { ERROR_MESSAGES } from "../util/error-messages";
import { SubscriptionCycleService } from './subscriptionCycle.service';
import { SubscriptionTypeService } from './subscriptionType.service';

export class SubscriptionService {

  private subscriptionCycleService: SubscriptionCycleService;
  private subscriptionTypeService: SubscriptionTypeService;

  constructor() {
    this.subscriptionCycleService = new SubscriptionCycleService();
    this.subscriptionTypeService = new SubscriptionTypeService();
  }


  public async createSubscription(
    practitionerId: number,
    subscriptionTypeId: number,
    subscriptionCycleId: number,
    amount: number,
  ): Promise<ISubscription> {
    try {
      const practitioner = await SqPractitioner.findByPk(practitionerId);
      if (!practitioner) {
        throw new CustomError(404, "Practitioner not found");
      }


      const startDate = Date.now();
      const endDate = await this.subscriptionCycleService.calculateEndDate(startDate, subscriptionCycleId);

      const subscription = await SqSubscription.create({
        practitionerId,
        subscriptionTypeId,
        subscriptionCycleId,
        startDate,
        endDate,
        amount,
        status: 'active',
      });

      return subscription.get({ plain: true }) as ISubscription;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(500, ERROR_MESSAGES.SUBSCRIPTION_CREATE_ERROR);
      }
    }
  }

  public async getAllSubscriptions(): Promise<ISubscription[]> {
    try {
      const subscriptions = await SqSubscription.findAll({
        include: [
          { model: SqSubscriptionType, as: 'type' },
          { model: SqSubscriptionCycle, as: 'cycle' },
        ],
      });
      return subscriptions.map((subscription) => subscription.get({ plain: true })) as ISubscription[];
    } catch (error) {
      throw new CustomError(500, ERROR_MESSAGES.SUBSCRIPTION_FETCH_ERROR);
    }
  }

  public async getSubscriptionById(subscriptionId: number): Promise<ISubscription> {
    try {
      const subscription = await SqSubscription.findByPk(subscriptionId, {
        include: [
          { model: SqSubscriptionType, as: 'type' },
          { model: SqSubscriptionCycle, as: 'cycle' },
        ],
      });
      if (!subscription) {
        throw new CustomError(404, 'Subscription not found');
      }
      return subscription.get({ plain: true }) as ISubscription;
    } catch (error) {
      throw error;
    }
  }

  public async updateSubscription(subscriptionId: number, subscriptionData: Partial<ISubscription>): Promise<ISubscription> {
    try {
      const subscription = await SqSubscription.findByPk(subscriptionId);
      if (!subscription) {
        throw new CustomError(404, 'Subscription not found');
      }
      await subscription.update(subscriptionData);
      return subscription.get({ plain: true }) as ISubscription;
    } catch (error) {
      throw error;
    }
  }

  public async deleteSubscription(subscriptionId: number): Promise<void> {
    try {
      const subscription = await SqSubscription.findByPk(subscriptionId);
      if (!subscription) {
        throw new CustomError(404, 'Subscription not found');
      }
      await subscription.destroy();
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(500, ERROR_MESSAGES.SUBSCRIPTION_DELETE_ERROR);
      }
    }
  }

  public async getSubscriptionsByPractitionerId(practitionerId: number): Promise<ISubscription[]> {
    try {
      const subscriptions = await SqSubscription.findAll({
        where: { practitionerId },
        include: [
          { model: SqSubscriptionType, as: 'type' },
          { model: SqSubscriptionCycle, as: 'cycle' },
        ],
      });

      return subscriptions.map((subscription) => subscription.get({ plain: true })) as ISubscription[];
    } catch (error) {
      throw new CustomError(500, ERROR_MESSAGES.SUBSCRIPTION_FETCH_ERROR);
    }
  }

  public async checkExpiringSubscriptions(): Promise<ISubscription[]> {
    try {
      // Définir la date de vérification à 7 jours dans le futur
      const expiringDate = new Date();
      expiringDate.setDate(expiringDate.getDate() + 7); // Vérifier les abonnements expirant dans 7 jours

      // Rechercher les abonnements actifs qui expirent dans 7 jours ou moins
      const expiringSubscriptions = await SqSubscription.findAll({
        where: {
          endDate: {
            [Op.lte]: expiringDate.getTime(), // Comparer avec la date limite
          },
          status: 'ACTIVE', // Seulement les abonnements actifs
        },
      });

      // Retourner les abonnements sous forme d'objet brut
      return expiringSubscriptions.map(sub => sub.get({ plain: true })) as ISubscription[];
    } catch (error) {
      // Gérer les erreurs lors de la récupération des abonnements
      throw new CustomError(500, 'Error checking expiring subscriptions');
    }
  }

  public async calculateTotalRevenue(): Promise<number> {
    try {
      const result = await SqSubscription.sum('amount');
      return result || 0;
    } catch (error) {
      throw new CustomError(500, "Error calculating total revenue");
    }
  }

}
