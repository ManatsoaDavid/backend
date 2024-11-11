import { Request, Response } from "express";
import { IApiResponse } from "../interfaces";
import { AuthService } from "../services/auth.service";
import { CustomError, UnauthorizedError } from "../util/error";

export class AuthController {
  private authService = new AuthService();

  public async login(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    const { email, password } = req.body;

    try {
      // Appel du service de login
      const { token, userType, userId, visitorId, practitionerId } = await this.authService.login(email, password);

      // Réponse réussie
      response = {
        success: true,
        message: "Connexion réussie",
        data: {
          token,
          userType,
          userId,
          visitorId,
          practitionerId,
        },
      };
      status = 200;
    } catch (error) {
      // Gestion des erreurs
      if (error instanceof UnauthorizedError) {
        response.message = "Identifiants incorrects";
        status = 401;
      } else if (error instanceof CustomError) {
        response.message = error.message;
        status = error.statusCode;
      } else {
        response.message = "Une erreur est survenue lors de la connexion";
        status = 500;
      }
    }

    // Envoi de la réponse
    res.status(status).json(response.data);

  }
}
