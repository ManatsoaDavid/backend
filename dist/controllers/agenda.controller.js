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
exports.AgendaController = void 0;
const error_1 = require("../util/error");
class AgendaController {
    constructor(agendaService) {
        this.agendaService = agendaService;
    }
    createAgenda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const agendaData = Object.assign(Object.assign({}, req.body), { category: req.body.category });
                const newAgenda = yield this.agendaService.createAgenda(agendaData);
                response = {
                    success: true,
                    data: newAgenda,
                };
                status = 201;
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    response.message = error.message;
                    status = error.statusCode;
                }
                else {
                    console.error('Internal server error:', error);
                    response.message = 'An error occurred while creating the agenda';
                    status = 500;
                }
            }
            res.status(status).json(response);
        });
    }
    getAgendas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const agendas = yield this.agendaService.getAgendas();
                response = {
                    success: true,
                    data: agendas,
                };
                status = 200;
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    response.message = error.message;
                    status = error.statusCode;
                }
                else {
                    console.error('Internal server error:', error);
                    response.message = 'An error occurred while fetching the agendas';
                    status = 500;
                }
            }
            res.status(status).json(response);
        });
    }
    getAgendaByPractitionerId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const practitionerId = req.params.id;
                if (!practitionerId) {
                    throw new error_1.CustomError(400, 'Practitioner ID is required');
                }
                const agendas = yield this.agendaService.getAgendaByPractitionerId(parseInt(practitionerId, 10));
                response = {
                    success: true,
                    data: agendas,
                };
                status = 200;
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    response.message = error.message;
                    status = error.statusCode;
                }
                else {
                    console.error('Internal server error:', error);
                    response.message = 'An error occurred while fetching the agendas';
                    status = 500;
                }
            }
            res.status(status).json(response);
        });
    }
    getAgendaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const agendaId = parseInt(req.params.agendaId, 10);
                const agenda = yield this.agendaService.getAgendaById(agendaId);
                response = {
                    success: true,
                    data: agenda,
                };
                status = 200;
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    response.message = error.message;
                    status = error.statusCode;
                }
                else {
                    console.error('Internal server error:', error);
                    response.message = 'An error occurred while fetching the agenda';
                    status = 500;
                }
            }
            res.status(status).json(response);
        });
    }
    updateAgenda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const agendaId = parseInt(req.params.agendaId, 10);
                const agendaData = req.body;
                const updatedAgenda = yield this.agendaService.updateAgenda(agendaId, agendaData);
                response = {
                    success: true,
                    data: updatedAgenda,
                };
                status = 200;
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    response.message = error.message;
                    status = error.statusCode;
                }
                else {
                    console.error('Internal server error:', error);
                    response.message = 'An error occurred while updating the agenda';
                    status = 500;
                }
            }
            res.status(status).json(response);
        });
    }
    deleteAgenda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const agendaId = parseInt(req.params.agendaId, 10);
                yield this.agendaService.deleteAgenda(agendaId);
                response = {
                    success: true,
                    message: 'Agenda deleted successfully',
                };
                status = 204;
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    response.message = error.message;
                    status = error.statusCode;
                }
                else {
                    console.error('Internal server error:', error);
                    response.message = 'An error occurred while deleting the agenda';
                    status = 500;
                }
            }
            res.status(status).json(response);
        });
    }
}
exports.AgendaController = AgendaController;
