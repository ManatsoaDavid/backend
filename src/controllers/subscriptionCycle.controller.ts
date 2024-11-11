import { Request, Response } from "express";
import { IApiResponse } from '../interfaces';
import { ISubscriptionCycle } from "../models/subscriptionCycle.model";
import { SubscriptionCycleService } from "../services/subscriptionCycle.service";
import { CustomError } from "../util/error";

export class SubscriptionCycleController {
  constructor(private subscriptionCycleService: SubscriptionCycleService) { }

  public async createSubscriptionCycle(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const subscriptionCycleData: ISubscriptionCycle = req.body;
      const newSubscriptionCycle = await this.subscriptionCycleService.createSubscriptionCycle(subscriptionCycleData);
      response = {
        success: true,
        data: newSubscriptionCycle,
      };
      status = 201;
    } catch (error) {
      if (error instanceof CustomError) {
        response.message = error.message;
        status = error.statusCode;
      } else {
        console.error('Internal server error:', error);
        response.message = 'An error occurred while creating the subscription cycle';
        status = 500;
      }
    }

    res.status(status).json(response);
  }

  public async getSubscriptionCycles(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const subscriptionCycles = await this.subscriptionCycleService.getAllSubscriptionCycles();
      response = {
        success: true,
        data: subscriptionCycles,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async getSubscriptionCycleById(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const subscriptionCycleId = parseInt(req.params.id, 10);
      const subscriptionCycle = await this.subscriptionCycleService.getSubscriptionCycleById(subscriptionCycleId);
      response = {
        success: true,
        data: subscriptionCycle,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async updateSubscriptionCycle(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const subscriptionCycleId = parseInt(req.params.id, 10);
      const subscriptionCycleData: Partial<ISubscriptionCycle> = req.body;
      const updatedSubscriptionCycle = await this.subscriptionCycleService.updateSubscriptionCycle(subscriptionCycleId, subscriptionCycleData);
      response = {
        success: true,
        data: updatedSubscriptionCycle,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async deleteSubscriptionCycle(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const subscriptionCycleId = parseInt(req.params.id, 10);
      await this.subscriptionCycleService.deleteSubscriptionCycle(subscriptionCycleId);
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
