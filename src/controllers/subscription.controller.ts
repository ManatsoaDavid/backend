import { Request, Response } from "express";
import { IApiResponse } from '../interfaces';
import { SubscriptionService } from "../services/subscription.service";
import { CustomError } from "../util/error";

export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) { }

  public async createSubscription(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = { success: false };
    let status: number;

    try {
      const subscription = await this.subscriptionService.createSubscription(req.body);
      response = {
        success: true,
        data: subscription,
      };
      status = 201;
    } catch (error) {
      if (error instanceof CustomError) {
        response.message = error.message;
        status = error.statusCode;
      } else {
        response.message = 'Error creating subscription';
        status = 500;
      }
    }

    res.status(status).json(response);
  }

  public async getSubscriptions(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const subscriptions = await this.subscriptionService.getAllSubscriptions();
      response = {
        success: true,
        data: subscriptions,
      };
      status = 200;
    } catch (error) {
      response.message = error instanceof Error ? error.message : 'Error checking subscription status';
      return;
    }

    res.status(status).json(response);
  }

  public async checkSubscriptionStatus(req: Request, res: Response): Promise<void> {
    const { practitionerId } = req.params;
    let response: IApiResponse = { success: false };
    let status: number;

    try {
      const subscriptionStatus = await this.subscriptionService.isSubscriptionActive(parseInt(practitionerId));
      response = {
        success: true,
        data: subscriptionStatus,
      };
      status = 200;
    } catch (error) {
      response.message = error instanceof Error ? error.message : 'Error checking subscription status';
      status = 500;
    }

    res.status(status).json(response);
  }

  public async getSubscriptionStats(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = { success: false };
    let status: number;

    try {
      const stats = await this.subscriptionService.getDetailedStats();
      response = {
        success: true,
        data: stats,
      };
      status = 200;
    } catch (error) {
      response.message = error instanceof Error ? error.message : 'Error fetching subscription stats';
      status = 500;
    }

    res.status(status).json(response);
  }

  public async renewSubscription(req: Request, res: Response): Promise<void> {
    const { subscriptionId } = req.params;
    let response: IApiResponse = { success: false };
    let status: number;

    try {
      const renewedSubscription = await this.subscriptionService.renewSubscription(parseInt(subscriptionId));
      response = {
        success: true,
        data: renewedSubscription,
      };
      status = 200;
    } catch (error) {
      response.message = error instanceof Error ? error.message : 'Error renewing subscription';
      status = 500;
    }

    res.status(status).json(response);
  }

  public async getSubscriptionHistory(req: Request, res: Response): Promise<void> {
    const { subscriptionId } = req.params;
    let response: IApiResponse = { success: false };
    let status: number;

    try {
      const history = await this.subscriptionService.getSubscriptionHistory(parseInt(subscriptionId));
      response = {
        success: true,
        data: history,
      };
      status = 200;
    } catch (error) {
      response.message = error instanceof Error ? error.message : 'Error fetching subscription history';
      status = 500;
    }

    res.status(status).json(response);
  }

  public async getPractitionersWithSubscriptions(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = { success: false };
    let status: number;

    try {
      const practitioners = await this.subscriptionService.getPractitionersWithSubscriptions();
      response = {
        success: true,
        data: practitioners,
      };
      status = 200;
    } catch (error) {
      response.message = error instanceof Error ? error.message : 'Error fetching practitioners subscriptions';
      status = 500;
    }

    res.status(status).json(response);
  }

}
