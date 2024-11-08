import { Request, Response } from "express";
import { IApiResponse } from '../interfaces';
import { IAvailability } from "../models/availability.model";
import { AvailabilityService } from "../services/availability.service";
import { CustomError } from "../util/error";

export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) { }

  public async createAvailability(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { agendaId, startTime, endTime, status: availabilityStatus } = req.body;

      const newAvailability = await this.availabilityService.createAvailability({
        agendaId,
        startTime: new Date(startTime).getTime(),
        endTime: new Date(endTime).getTime(),
        status: availabilityStatus,
      });

      response = {
        success: true,
        data: newAvailability,
      };
      status = 201;
    } catch (error) {
      if (error instanceof CustomError) {
        response.message = error.message;
        status = error.statusCode;
      } else {
        console.error('Internal server error:', error);
        response.message = 'An error occurred while creating the availability';
        status = 500;
      }
    }

    res.status(status).json(response);
  }

  public async getAvailabilities(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const availabilities = await this.availabilityService.getAvailability();
      response = {
        success: true,
        data: availabilities,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }


  public async updateAvailability(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const availabilityId = parseInt(req.params.id, 10);
      const availabilityData: Partial<IAvailability> = req.body;
      const updatedAvailability = await this.availabilityService.updateAvailability(availabilityId, availabilityData);
      response = {
        success: true,
        data: updatedAvailability,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async deleteAvailability(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const availabilityId = parseInt(req.params.id, 10);
      await this.availabilityService.deleteAvailability(availabilityId);
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
