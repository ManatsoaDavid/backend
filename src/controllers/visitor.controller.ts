import { Request, Response } from "express";
import { IApiResponse } from '../interfaces';
import { VisitorService } from "../services/visitor.service";
import { CustomError } from "../util/error";

export class VisitorController {
  constructor(private visitorService: VisitorService) { }

  public async createVisitor(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const visitorData = req.body;
      const newVisitor = await this.visitorService.createVisitor(visitorData);
      response = {
        success: true,
        message: "Visiteur créé avec succès.",
        data: newVisitor,
      };
      status = 201;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

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
      const { id } = req.params;
      const visitor = await this.visitorService.getVisitorById(parseInt(id));
      if (visitor) {
        response = {
          success: true,
          data: visitor,
        };
        status = 200;
      } else {
        response = {
          success: false,
          message: 'Visiteur non trouvé',
        };
        status = 404;
      }
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
      const { id } = req.params;
      const visitorData = req.body;
      const updatedVisitor = await this.visitorService.updateVisitor(parseInt(id), visitorData);
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
      const { id } = req.params;
      await this.visitorService.deleteVisitor(parseInt(id));
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
