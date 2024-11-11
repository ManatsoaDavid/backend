import { Request, Response } from "express";
import { IApiResponse } from '../interfaces';
import { IAgenda } from "../models/agenda.model";
import { EAgendaCategory } from '../models/enums';
import { AgendaService } from "../services/agenda.service";
import { CustomError } from "../util/error";

export class AgendaController {
  constructor(private agendaService: AgendaService) { }

  public async createAgenda(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const agendaData: IAgenda = {
        ...req.body,
        category: req.body.category as EAgendaCategory,
      };
      const newAgenda = await this.agendaService.createAgenda(agendaData);
      response = {
        success: true,
        data: newAgenda,
      };
      status = 201;
    } catch (error) {
      if (error instanceof CustomError) {
        response.message = error.message;
        status = error.statusCode;
      } else {
        console.error('Internal server error:', error);
        response.message = 'An error occurred while creating the agenda';
        status = 500;
      }
    }

    res.status(status).json(response);
  }

  public async getAgendas(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const agendas = await this.agendaService.getAgendas();
      response = {
        success: true,
        data: agendas,
      };
      status = 200;
    } catch (error) {
      if (error instanceof CustomError) {
        response.message = error.message;
        status = error.statusCode;
      } else {
        console.error('Internal server error:', error);
        response.message = 'An error occurred while fetching the agendas';
        status = 500;
      }
    }

    res.status(status).json(response);
  }

  public async getAgendaByPractitionerId(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const practitionerId = req.params.id;
      if (!practitionerId) {
        throw new CustomError(400, 'Practitioner ID is required');
      }
      const agendas = await this.agendaService.getAgendaByPractitionerId(parseInt(practitionerId, 10));
      response = {
        success: true,
        data: agendas,
      };
      status = 200;
    } catch (error) {
      if (error instanceof CustomError) {
        response.message = error.message;
        status = error.statusCode;
      } else {
        console.error('Internal server error:', error);
        response.message = 'An error occurred while fetching the agendas';
        status = 500;
      }
    }

    res.status(status).json(response);
  }



  public async getAgendaById(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const agendaId = parseInt(req.params.agendaId, 10);
      const agenda = await this.agendaService.getAgendaById(agendaId);
      response = {
        success: true,
        data: agenda,
      };
      status = 200;
    } catch (error) {
      if (error instanceof CustomError) {
        response.message = error.message;
        status = error.statusCode;
      } else {
        console.error('Internal server error:', error);
        response.message = 'An error occurred while fetching the agenda';
        status = 500;
      }
    }

    res.status(status).json(response);
  }

  public async updateAgenda(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const agendaId = parseInt(req.params.agendaId, 10);
      const agendaData: Partial<IAgenda> = req.body;
      const updatedAgenda = await this.agendaService.updateAgenda(agendaId, agendaData);
      response = {
        success: true,
        data: updatedAgenda,
      };
      status = 200;
    } catch (error) {
      if (error instanceof CustomError) {
        response.message = error.message;
        status = error.statusCode;
      } else {
        console.error('Internal server error:', error);
        response.message = 'An error occurred while updating the agenda';
        status = 500;
      }
    }

    res.status(status).json(response);
  }

  public async deleteAgenda(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const agendaId = parseInt(req.params.agendaId, 10);
      await this.agendaService.deleteAgenda(agendaId);

      response = {
        success: true,
        message: 'Agenda deleted successfully',
      };
      status = 204;
    } catch (error) {
      if (error instanceof CustomError) {
        response.message = error.message;
        status = error.statusCode;
      } else {
        console.error('Internal server error:', error);
        response.message = 'An error occurred while deleting the agenda';
        status = 500;
      }
    }

    res.status(status).json(response);
  }
}
