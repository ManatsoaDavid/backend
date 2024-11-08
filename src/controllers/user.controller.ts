import { Request, Response } from "express";
import { IApiResponse } from '../interfaces';
import { UserService } from "../services/user.service";
import { CustomError } from "../util/error";

export class UserController {
  constructor(private userService: UserService) { }
  public async register(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { userType, practitionerType } = req.body;

      // Call the service for registration
      const user = await this.userService.register(req.body);

      // Success response without token
      let message: string;
      if (userType === "PRATICIEN") {
        message = "Praticien créé avec succès.";
      } else {
        message = "Visiteur créé avec succès.";
      }

      response = {
        success: true,
        message,
        data: {
          userId: user.userId,
          email: user.email,
          type: userType === "PRATICIEN" ? "Praticien" : "Visiteur",
        },
      };
      status = 201;
    } catch (error) {
      response.message = error instanceof Error ? error.message : "Une erreur inconnue s'est produite.";
      status = 400;
    }

    res.status(status).json(response);
  }

  public async getUsers(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const users = await this.userService.getUsers();
      response = {
        success: true,
        data: users,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const userId = parseInt(req.params.id, 10);
      const user = await this.userService.getUserById(userId);
      response = {
        success: true,
        data: user,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const userId = parseInt(req.params.id);
      const updatedUser = await this.userService.updateUser(userId, req.body);
      response = {
        success: true,
        data: updatedUser,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
      message: ''
    };
    let status: number;

    try {
      const userId = parseInt(req.params.id);
      await this.userService.deleteUser(userId);
      response = {
        success: true,
        message: 'Utilisateur supprimé avec succès'
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }




  /***********************VERIFIER L EMAIL CHEK*************** */
  public async checkEmailExists(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      const exists = await this.userService.checkEmailExists(email);
      res.status(200).json({ exists });
    } catch (error) {
      this.handleError(error, res);
    }
  }

  /***************************VERIFIER LE NUMERO ********* */

  public async checkPhoneExists(req: Request, res: Response): Promise<void> {
    try {
      const { contact } = req.body;
      const exists = await this.userService.checkPhoneExists(contact);
      res.status(200).json({ exists });
    } catch (error) {
      this.handleError(error, res);
    }
  }

  /***********************SELECTIONNER LES PRATICIENT QUI SONT ACCEPTER*** */

  public async getAcceptedPractitioners(req: Request, res: Response): Promise<void> {
    try {
      const acceptedPractitioners = await this.userService.getAcceptedPractitioners();
      res.status(200).json(acceptedPractitioners);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  public async getUserCount(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const count = await this.userService.countUsers();
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
