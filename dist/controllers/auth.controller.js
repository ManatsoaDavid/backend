"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const error_1 = require("../util/error");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            const { email, password } = req.body;
            try {
                // Appel du service de login
                const { token, userType, userId, visitorId, practitionerId } = yield this.authService.login(email, password);
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
            }
            catch (error) {
                // Gestion des erreurs
                if (error instanceof error_1.UnauthorizedError) {
                    response.message = "Identifiants incorrects";
                    status = 401;
                }
                else if (error instanceof error_1.CustomError) {
                    response.message = error.message;
                    status = error.statusCode;
                }
                else {
                    response.message = "Une erreur est survenue lors de la connexion";
                    status = 500;
                }
            }
            // Envoi de la réponse
            res.status(status).json(response.data);
        });
    }
}
exports.AuthController = AuthController;
