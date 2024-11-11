import { Op, Sequelize } from "sequelize";
import { ISubscription } from '../models/subscription.model';
import SqPractitioner from "../sequelize-model/SqPractitioner";
import { SqSubscription } from "../sequelize-model/SqSubscription";
import { SqSubscriptionCycle } from "../sequelize-model/SqSubscriptionCycle";
import { SqSubscriptionHistory } from "../sequelize-model/SqSubscriptionHistory";
import { SqSubscriptionType } from "../sequelize-model/SqSubscriptionType";
import { CustomError } from "../util/error";
import { ERROR_MESSAGES } from "../util/error-messages";
import { SubscriptionCycleService } from './subscriptionCycle.service';
import { SubscriptionTypeService } from './subscriptionType.service';
import SqUser from "../sequelize-model/SqUser";

interface DetailedStats {
  totalSubscriptions: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  expiringThisWeek: number;
  subscriptionsByType: Record<string, number>;
}

export class SubscriptionService {
  private subscriptionCycleService: SubscriptionCycleService;
  private subscriptionTypeService: SubscriptionTypeService;

  constructor() {
    this.subscriptionCycleService = new SubscriptionCycleService();
    this.subscriptionTypeService = new SubscriptionTypeService();
  }

  public async createSubscription(data: {
    practitionerId: number,
    subscriptionTypeId: number,
    subscriptionCycleId: number,
    amount: number
  }): Promise<ISubscription> {
    try {
      const { practitionerId, subscriptionTypeId, subscriptionCycleId, amount } = data;

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
        status: 'active'
      });

      await SqSubscriptionHistory.create({
        subscriptionId: subscription.get('subscriptionId'),
        field: 'creation',
        oldValue: null,
        newValue: JSON.stringify(subscription.toJSON()),
        changeDate: Date.now()
      });

      return subscription.get({ plain: true });
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError(500, ERROR_MESSAGES.SUBSCRIPTION_CREATE_ERROR);
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


  public async isSubscriptionActive(practitionerId: number): Promise<{
    isActive: boolean;
    remainingDays: number;
    subscriptionDetails?: ISubscription;
  }> {
    try {
      const subscription = await SqSubscription.findOne({
        where: {
          practitionerId,
          status: 'active',
          endDate: { [Op.gt]: Date.now() }
        },
        include: [
          { model: SqSubscriptionType, as: 'type' },
          { model: SqSubscriptionCycle, as: 'cycle' }
        ]
      });

      if (!subscription) {
        return { isActive: false, remainingDays: 0 };
      }

      const remainingDays = Math.ceil((subscription.get('endDate') - Date.now()) / (1000 * 60 * 60 * 24));
      return {
        isActive: true,
        remainingDays,
        subscriptionDetails: subscription.get({ plain: true })
      };
    } catch (error) {
      throw new CustomError(500, ERROR_MESSAGES.SUBSCRIPTION_FETCH_ERROR);
    }
  }

  public async getDetailedStats(): Promise<DetailedStats> {
    try {
      const currentDate = Date.now();
      const weekFromNow = currentDate + 7 * 24 * 60 * 60 * 1000;

      const [total, active, expiring, revenue, typeStats] = await Promise.all([
        SqSubscription.count(),
        SqSubscription.count({ where: { status: 'active' } }),
        SqSubscription.count({
          where: {
            status: 'active',
            endDate: { [Op.between]: [currentDate, weekFromNow] }
          }
        }),
        SqSubscription.sum('amount', {
          where: {
            startDate: { [Op.gte]: new Date().setDate(1) }
          }
        }),
        SqSubscription.findAll({
          attributes: [
            'subscriptionTypeId',
            [Sequelize.fn('COUNT', '*'), 'count']
          ],
          group: ['subscriptionTypeId'],
          include: [{ model: SqSubscriptionType, as: 'type' }]
        })
      ]);

      const subscriptionsByType: Record<string, number> = {};
      typeStats.forEach(stat => {
        const typeName = stat.get('type')?.name || 'Unknown';
        subscriptionsByType[typeName] = Number(stat.get('count')) || 0;
      });
      return {
        totalSubscriptions: total || 0,
        activeSubscriptions: active || 0,
        monthlyRevenue: revenue || 0,
        expiringThisWeek: expiring || 0,
        subscriptionsByType
      };
    } catch (error) {
      throw new CustomError(500, ERROR_MESSAGES.SUBSCRIPTION_FETCH_ERROR);
    }
  }

  public async renewSubscription(subscriptionId: number): Promise<ISubscription> {
    try {
      const currentSubscription = await SqSubscription.findByPk(subscriptionId);
      if (!currentSubscription) {
        throw new CustomError(404, 'Subscription not found');
      }

      const newSubscription = await this.createSubscription({
        practitionerId: currentSubscription.get('practitionerId'),
        subscriptionTypeId: currentSubscription.get('subscriptionTypeId'),
        subscriptionCycleId: currentSubscription.get('subscriptionCycleId'),
        amount: currentSubscription.get('amount')
      });

      if (!newSubscription.subscriptionId) {
        throw new CustomError(500, "Failed to create new subscription");
      }

      await SqSubscriptionHistory.create({
        subscriptionId: newSubscription.subscriptionId,
        field: 'renewal',
        oldValue: subscriptionId.toString(),
        newValue: newSubscription.subscriptionId.toString(),
        changeDate: Date.now()
      });

      return newSubscription;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw new CustomError(500, "Erreur de serveur lors de la renouvellement de la souscription");
    }

  }
  public async getSubscriptionHistory(subscriptionId: number): Promise<Array<{
    changeDate: number;
    field: string;
    oldValue: string;
    newValue: string;
  }>> {
    try {
      const history = await SqSubscriptionHistory.findAll({
        where: { subscriptionId },
        order: [['changeDate', 'DESC']]
      });

      return history.map(entry => entry.get({ plain: true }));
    } catch (error) {
      throw new CustomError(500, "Erreur de serveur lors de la récupération de l'historique de souscription");
    }
  }

  public async getPractitionersWithSubscriptions(): Promise<Array<{
    practitioner: any;
    subscriptions: ISubscription[];
  }>> {
    try {
      const practitioners = await SqPractitioner.findAll({
        include: [
          {
            model: SqUser,
            attributes: ['name', 'firstName', 'email', 'contact']
          },
          {
            model: SqSubscription,
            include: [
              { model: SqSubscriptionType, as: 'type' },
              { model: SqSubscriptionCycle, as: 'cycle' }
            ]
          }
        ]
      });

      return practitioners.map(practitioner => ({
        practitioner: {
          id: practitioner.get('practitionerId'),
          user: practitioner.get('user'),
          speciality: practitioner.get('speciality')
        },
        subscriptions: practitioner.get('subscriptions')
      }));
    } catch (error) {
      throw new CustomError(500, ERROR_MESSAGES.SUBSCRIPTION_FETCH_ERROR);
    }
  }

}
