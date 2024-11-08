import { Request, Response } from "express";
import { IApiResponse } from '../interfaces';
import { ISubscription } from "../models/subscription.model";
import { SubscriptionService } from "../services/subscription.service";
import { CustomError } from "../util/error";

export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) { }

  public async createSubscription(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { practitionerId, subscriptionTypeId, subscriptionCycleId, amount } = req.body;
      const subscription = await this.subscriptionService.createSubscription(
        practitionerId,
        subscriptionTypeId,
        subscriptionCycleId,
        amount
      );
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
        console.error('Internal server error:', error);
        response.message = 'An error occurred while creating the subscription';
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
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async getSubscriptionById(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const subscriptionId = parseInt(req.params.id, 10);
      const subscription = await this.subscriptionService.getSubscriptionById(subscriptionId);
      response = {
        success: true,
        data: subscription,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async updateSubscription(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const subscriptionId = parseInt(req.params.id, 10);
      const subscriptionData: Partial<ISubscription> = req.body;
      const updatedSubscription = await this.subscriptionService.updateSubscription(subscriptionId, subscriptionData);
      response = {
        success: true,
        data: updatedSubscription,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async deleteSubscription(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const subscriptionId = parseInt(req.params.id, 10);
      await this.subscriptionService.deleteSubscription(subscriptionId);
      response = {
        success: true,
      };
      status = 204;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async getSubscriptionsByPractitioner(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { practitionerId } = req.params;
      const subscriptions = await this.subscriptionService.getSubscriptionsByPractitionerId(parseInt(practitionerId));
      response = {
        success: true,
        data: subscriptions,
      };
      status = 200;
    } catch (error) {
      if (error instanceof CustomError) {
        response.message = error.message;
        status = error.statusCode;
      } else {
        console.error('Internal server error:', error);
        response.message = 'An error occurred while fetching the subscriptions';
        status = 500;
      }
    }

    res.status(status).json(response);
  }

  public async checkExpiringSubscriptions(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const expiringSubscriptions = await this.subscriptionService.checkExpiringSubscriptions();
      response = {
        success: true,
        data: expiringSubscriptions,
      };
      status = 200;
    } catch (error) {
      if (error instanceof CustomError) {
        response.message = error.message;
        status = error.statusCode;
      } else {
        console.error('Internal server error:', error);
        response.message = 'An error occurred while checking expiring subscriptions';
        status = 500;
      }
    }

    res.status(status).json(response);
  }

  public async getTotalRevenue(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const totalRevenue = await this.subscriptionService.calculateTotalRevenue();
      response = {
        success: true,
        data: { totalRevenue },
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }


  private handleError(error: unknown, res: Response): void {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
