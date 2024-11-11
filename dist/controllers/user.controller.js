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
exports.UserController = void 0;
const error_1 = require("../util/error");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { userType, practitionerType } = req.body;
                // Call the service for registration
                const user = yield this.userService.register(req.body);
                // Success response without token
                let message;
                if (userType === "PRATICIEN") {
                    message = "Praticien créé avec succès.";
                }
                else {
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
            }
            catch (error) {
                response.message = error instanceof Error ? error.message : "Une erreur inconnue s'est produite.";
                status = 400;
            }
            res.status(status).json(response);
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const users = yield this.userService.getUsers();
                response = {
                    success: true,
                    data: users,
                };
                status = 200;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const userId = parseInt(req.params.id, 10);
                const user = yield this.userService.getUserById(userId);
                response = {
                    success: true,
                    data: user,
                };
                status = 200;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const userId = parseInt(req.params.id);
                const updatedUser = yield this.userService.updateUser(userId, req.body);
                response = {
                    success: true,
                    data: updatedUser,
                };
                status = 200;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
                message: ''
            };
            let status;
            try {
                const userId = parseInt(req.params.id);
                yield this.userService.deleteUser(userId);
                response = {
                    success: true,
                    message: 'Utilisateur supprimé avec succès'
                };
                status = 200;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    handleError(error, res) {
        if (error instanceof error_1.CustomError) {
            res.status(error.statusCode).json({ error: error.message });
        }
        else if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
    /***********************VERIFIER L EMAIL CHEK*************** */
    checkEmailExists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const exists = yield this.userService.checkEmailExists(email);
                res.status(200).json({ exists });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
    }
    /***************************VERIFIER LE NUMERO ********* */
    checkPhoneExists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { contact } = req.body;
                const exists = yield this.userService.checkPhoneExists(contact);
                res.status(200).json({ exists });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
    }
    /***********************SELECTIONNER LES PRATICIENT QUI SONT ACCEPTER*** */
    getAcceptedPractitioners(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const acceptedPractitioners = yield this.userService.getAcceptedPractitioners();
                res.status(200).json(acceptedPractitioners);
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
    }
    /*******************CHANGER DE MOT DE PASSE *************** */
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const userId = parseInt(req.params.id);
                const { oldPassword, newPassword } = req.body;
                yield this.userService.changePassword(userId, oldPassword, newPassword);
                response = {
                    success: true,
                    message: 'Mot de passe modifié avec succès'
                };
                status = 200;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
}
exports.UserController = UserController;
