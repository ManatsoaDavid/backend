import { Request, Response } from 'express';
import { IApiResponse } from '../interfaces';
import { IPractitioner } from '../models/practitioner.model';
import { PractitionerService } from '../services/practitioner.service';


export class PractitionerController {
  private practitionerService: PractitionerService;

  constructor() {
    this.practitionerService = new PractitionerService();
  }

  public async getAllPractitioners(req: Request, res: Response): Promise<void> {
    console.log("Fetching all practitioners...");
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const practitioners = await this.practitionerService.getAllPractitioners();
      response = {
        success: true,
        data: practitioners,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async getPractitionerById(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { id } = req.params;
      const practitioner = await this.practitionerService.getPractitionerById(parseInt(id));
      if (practitioner) {
        response = {
          success: true,
          data: practitioner,
        };
        status = 200;
      } else {
        response = {
          success: false,
          message: 'Praticien non trouvé',
        };
        status = 404;
      }
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async createPractitioner(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const practitionerData = req.body as IPractitioner;
      const newPractitioner = await this.practitionerService.createPractitioner(practitionerData);
      response = {
        success: true,
        data: newPractitioner,
      };
      status = 201;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async updatePractitioner(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedPractitioner = await this.practitionerService.updatePractitioner(parseInt(id), updateData);
      if (!updatedPractitioner) {
        res.status(404).json({ error: 'Praticien non trouvé' });
      } else {
        res.status(200).json(updatedPractitioner);
      }
    } catch (error: unknown) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }

  }

  public async deletePractitioner(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { id } = req.params;
      const deleted = await this.practitionerService.deletePractitioner(parseInt(id));
      if (deleted) {
        response = {
          success: true,
        };
        status = 204;
      } else {
        response = {
          success: false,
          message: 'Praticien non trouvé',
        };
        status = 404;
      }
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }




  public async getPractitionerCount(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const count = await this.practitionerService.countPractitioners();
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
    console.error('Erreur dans le controller des praticiens:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue',
    });
  }
}
