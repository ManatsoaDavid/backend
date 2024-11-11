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
exports.PractitionerController = void 0;
const practitioner_service_1 = require("../services/practitioner.service");
class PractitionerController {
    constructor() {
        this.practitionerService = new practitioner_service_1.PractitionerService();
    }
    getAllPractitioners(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Fetching all practitioners...");
            let response = {
                success: false,
            };
            let status;
            try {
                const practitioners = yield this.practitionerService.getAllPractitioners();
                response = {
                    success: true,
                    data: practitioners,
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
    getPractitionerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { id } = req.params;
                const practitioner = yield this.practitionerService.getPractitionerById(parseInt(id));
                if (practitioner) {
                    response = {
                        success: true,
                        data: practitioner,
                    };
                    status = 200;
                }
                else {
                    response = {
                        success: false,
                        message: 'Praticien non trouvé',
                    };
                    status = 404;
                }
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    createPractitioner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const practitionerData = req.body;
                const newPractitioner = yield this.practitionerService.createPractitioner(practitionerData);
                response = {
                    success: true,
                    data: newPractitioner,
                };
                status = 201;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    updatePractitioner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const updatedPractitioner = yield this.practitionerService.updatePractitioner(parseInt(id), updateData);
                if (!updatedPractitioner) {
                    res.status(404).json({ error: 'Praticien non trouvé' });
                }
                else {
                    res.status(200).json(updatedPractitioner);
                }
            }
            catch (error) {
                res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            }
        });
    }
    deletePractitioner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { id } = req.params;
                const deleted = yield this.practitionerService.deletePractitioner(parseInt(id));
                if (deleted) {
                    response = {
                        success: true,
                    };
                    status = 204;
                }
                else {
                    response = {
                        success: false,
                        message: 'Praticien non trouvé',
                    };
                    status = 404;
                }
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    getPractitionerCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const count = yield this.practitionerService.countPractitioners();
                response = {
                    success: true,
                    data: { count },
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
        console.error('Erreur dans le controller des praticiens:', error);
        res.status(500).json({
            success: false,
            message: 'Une erreur est survenue',
        });
    }
}
exports.PractitionerController = PractitionerController;
