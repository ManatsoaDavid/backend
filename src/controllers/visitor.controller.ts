import { Request, Response } from "express";
import { IApiResponse } from "../interfaces";
import { VisitorService } from "../services/visitor.service";
import { CustomError } from "../util/error";

export class VisitorController {

  constructor(private visitorService: VisitorService) { }

  public createVisitor = async (req: Request, res: Response): Promise<void> => {
    try {
      const visitorData = req.body;
      const visitor = await this.visitorService.createVisitor(visitorData);
      res.status(201).json(visitor);
    } catch (error: unknown) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  };

  public async getAllVisitors(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const visitors = await this.visitorService.getAllVisitors();
      response = {
        success: true,
        data: visitors,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }


  public async getVisitorById(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const visitorId = parseInt(req.params.id, 10);
      const visitor = await this.visitorService.getVisitorById(visitorId);
      response = {
        success: true,
        data: visitor,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }


  public async updateVisitor(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const visitorId = parseInt(req.params.id);
      const updatedVisitor = await this.visitorService.updateVisitor(visitorId, req.body);
      response = {
        success: true,
        data: updatedVisitor,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }





  public async deleteVisitor(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
      message: ''
    };
    let status: number;

    try {
      const visitorId = parseInt(req.params.id);
      await this.visitorService.deleteVisitor(visitorId);
      response = {
        success: true,
        message: 'Visiteur supprimé avec succès'
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }


  public async getVisitorCount(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const count = await this.visitorService.countVisitor();
      response = {
        success: true,
        data: { count },
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  private handleError(error: unknown, res: Response): void {
    let errorMessage = 'An unknown error occurred';
    let statusCode = 500;

    if (error instanceof CustomError) {
      errorMessage = error.message;
      statusCode = error.statusCode;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
    });
  }

}
