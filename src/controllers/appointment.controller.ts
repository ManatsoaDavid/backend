import { Request, Response } from 'express';
import { IApiResponse } from '../interfaces';
import { AppointmentService } from '../services/appointment.service';

export class AppointmentController {
  private appointmentService: AppointmentService;

  constructor() {
    this.appointmentService = new AppointmentService();
  }

  public async createAppointment(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { visitorId, availabilityId, reason, dateAppointment } = req.body;
      const newAppointment = await this.appointmentService.createAppointment(visitorId, availabilityId, reason, dateAppointment);
      response = {
        success: true,
        data: newAppointment,
      };
      status = 201;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async getAllAppointments(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const appointments = await this.appointmentService.getAllAppointments();
      response = {
        success: true,
        data: appointments,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async getAppointmentById(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { id } = req.params;
      const appointment = await this.appointmentService.getAppointmentById(parseInt(id));
      if (appointment) {
        response = {
          success: true,
          data: appointment,
        };
        status = 200;
      } else {
        response = {
          success: false,
          message: 'Appointment not found',
        };
        status = 404;
      }
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async updateAppointment(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedAppointment = await this.appointmentService.updateAppointment(parseInt(id), updatedData);
      if (updatedAppointment) {
        response = {
          success: true,
          data: updatedAppointment,
        };
        status = 200;
      } else {
        response = {
          success: false,
          message: 'Appointment not found',
        };
        status = 404;
      }
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async deleteAppointment(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { id } = req.params;
      const deleted = await this.appointmentService.deleteAppointment(parseInt(id));
      if (deleted) {
        response = {
          success: true,
        };
        status = 204;
      } else {
        response = {
          success: false,
          message: 'Appointment not found',
        };
        status = 404;
      }
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async getAppointmentsForVisitor(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { visitorId } = req.params;
      const appointments = await this.appointmentService.getAppointmentsForVisitor(parseInt(visitorId));
      response = {
        success: true,
        data: appointments,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async getAppointmentsForPractitioner(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { practitionerId } = req.params;
      const appointments = await this.appointmentService.getAppointmentsForPractitioner(parseInt(practitionerId));
      response = {
        success: true,
        data: appointments,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async getAppointmentsByStatus(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let statusCode: number;

    try {
      const { practitionerId, status } = req.query;
      const appointments = await this.appointmentService.getAppointmentsByStatus(
        parseInt(practitionerId as string),
        status as string
      );
      response = {
        success: true,
        data: appointments,
      };
      statusCode = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(statusCode).json(response);
  }
  public async confirmAppointment(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { id } = req.params;
      const confirmedAppointment = await this.appointmentService.confirmAppointment(parseInt(id));
      if (confirmedAppointment) {
        response = {
          success: true,
          data: confirmedAppointment,
        };
        status = 200;
      } else {
        response = {
          success: false,
          message: 'Appointment not found',
        };
        status = 404;
      }
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async rejectAppointment(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { id } = req.params;
      const { reason } = req.body;
      const rejectedAppointment = await this.appointmentService.rejectAppointment(parseInt(id), reason);
      if (rejectedAppointment) {
        response = {
          success: true,
          data: rejectedAppointment,
        };
        status = 200;
      } else {
        response = {
          success: false,
          message: 'Appointment not found',
        };
        status = 404;
      }
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async postponeAppointment(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { id } = req.params;
      const { newDate } = req.body;
      const postponedAppointment = await this.appointmentService.postponeAppointment(parseInt(id), newDate);
      if (postponedAppointment) {
        response = {
          success: true,
          data: postponedAppointment,
        };
        status = 200;
      } else {
        response = {
          success: false,
          message: 'Appointment not found',
        };
        status = 404;
      }
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async cancelAppointment(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { id } = req.params;
      const { reason } = req.body;
      const cancelledAppointment = await this.appointmentService.cancelAppointment(parseInt(id), reason);
      if (cancelledAppointment) {
        response = {
          success: true,
          data: cancelledAppointment,
        };
        status = 200;
      } else {
        response = {
          success: false,
          message: 'Appointment not found',
        };
        status = 404;
      }
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  private handleError(error: unknown, res: Response): void {
    console.error('Error in the appointment controller:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    });
  }

  /**********CHECK APPOINTMENTDATE********* */

  public async getExistingAppointmentsForAvailability(req: Request, res: Response): Promise<void> {
    try {
      const { availabilityId } = req.params;
      const existingAppointments = await this.appointmentService.getExistingAppointmentsForAvailability(parseInt(availabilityId));
      res.status(200).json({ success: true, data: existingAppointments });
    } catch (error) {
      this.handleError(error, res);
    }
  }

}
