import { Request, Response } from "express";
import { IApiResponse } from '../interfaces';
import { ISubscriptionType } from "../models/subscriptionType.model";
import { SubscriptionTypeService } from "../services/subscriptionType.service";
import { CustomError } from "../util/error";

export class SubscriptionTypeController {
  constructor(private subscriptionTypeService: SubscriptionTypeService) { }

  public async createSubscriptionType(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const subscriptionTypeData: ISubscriptionType = req.body;
      const newSubscriptionType = await this.subscriptionTypeService.createSubscriptionType(subscriptionTypeData);
      response = {
        success: true,
        data: newSubscriptionType,
      };
      status = 201;
    } catch (error) {
      if (error instanceof CustomError) {
        response.message = error.message;
        status = error.statusCode;
      } else {
        console.error('Internal server error:', error);
        response.message = 'An error occurred while creating the subscription type';
        status = 500;
      }
    }

    res.status(status).json(response);
  }

  public async getSubscriptionTypes(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const subscriptionTypes = await this.subscriptionTypeService.getAllSubscriptionTypes();
      response = {
        success: true,
        data: subscriptionTypes,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async getSubscriptionTypeById(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const subscriptionTypeId = parseInt(req.params.id, 10);
      const subscriptionType = await this.subscriptionTypeService.getSubscriptionTypeById(subscriptionTypeId);
      response = {
        success: true,
        data: subscriptionType,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async updateSubscriptionType(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const subscriptionTypeId = parseInt(req.params.id, 10);
      const subscriptionTypeData: Partial<ISubscriptionType> = req.body;
      const updatedSubscriptionType = await this.subscriptionTypeService.updateSubscriptionType(subscriptionTypeId, subscriptionTypeData);
      response = {
        success: true,
        data: updatedSubscriptionType,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async deleteSubscriptionType(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const subscriptionTypeId = parseInt(req.params.id, 10);
      await this.subscriptionTypeService.deleteSubscriptionType(subscriptionTypeId);
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
