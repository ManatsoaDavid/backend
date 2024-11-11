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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendaService = void 0;
const SqAgenda_1 = __importDefault(require("../sequelize-model/SqAgenda"));
const SqAvailability_1 = __importDefault(require("../sequelize-model/SqAvailability"));
const SqPractitioner_1 = __importDefault(require("../sequelize-model/SqPractitioner"));
const error_1 = require("../util/error");
const error_messages_1 = require("../util/error-messages");
class AgendaService {
    createAgenda(agendaData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const practitioner = yield SqPractitioner_1.default.findByPk(agendaData.practitionerId);
                if (!practitioner) {
                    throw new error_1.CustomError(404, 'Le praticien n\'existe pas');
                }
                const agenda = yield SqAgenda_1.default.create({
                    practitionerId: agendaData.practitionerId,
                    category: agendaData.category,
                });
                return agenda.get({ plain: true });
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    throw error;
                }
                else {
                    throw new error_1.CustomError(500, error_messages_1.ERROR_MESSAGES.AGENDA_CREATE_ERROR);
                }
            }
        });
    }
    getAgendas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agendas = yield SqAgenda_1.default.findAll();
                return agendas.map((agenda) => agenda.get({ plain: true }));
            }
            catch (error) {
                throw new error_1.CustomError(500, error_messages_1.ERROR_MESSAGES.AGENDA_FETCH_ERROR);
            }
        });
    }
    getAgendaById(agendaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agenda = yield SqAgenda_1.default.findByPk(agendaId);
                if (!agenda) {
                    throw new error_1.CustomError(404, 'Agenda not found');
                }
                return agenda.get({ plain: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAgendaByPractitionerId(practitionerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agendas = yield SqAgenda_1.default.findAll({
                    where: {
                        practitionerId: practitionerId,
                    },
                    include: [
                        {
                            model: SqAvailability_1.default,
                            as: 'availabilities',
                        },
                    ],
                });
                return agendas.map((agenda) => agenda.get({ plain: true }));
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    throw error;
                }
                else {
                    throw new error_1.CustomError(500, error_messages_1.ERROR_MESSAGES.AGENDA_FETCH_ERROR);
                }
            }
        });
    }
    updateAgenda(agendaId, agendaData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agenda = yield SqAgenda_1.default.findByPk(agendaId);
                if (!agenda) {
                    throw new error_1.CustomError(404, 'Agenda not found');
                }
                yield agenda.update(agendaData);
                return agenda.get({ plain: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteAgenda(agendaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Récupérer l'agenda à supprimer
                const agenda = yield SqAgenda_1.default.findByPk(agendaId);
                if (!agenda) {
                    throw new error_1.CustomError(404, 'Agenda not found');
                }
                // Supprimer les disponibilités associées à l'agenda
                yield SqAvailability_1.default.destroy({
                    where: {
                        agendaId: agendaId,
                    },
                });
                // Supprimer l'agenda
                yield agenda.destroy();
            }
            catch (error) {
                if (error instanceof error_1.CustomError) {
                    throw error;
                }
                else {
                    throw new error_1.CustomError(500, error_messages_1.ERROR_MESSAGES.AGENDA_DELETE_ERROR);
                }
            }
        });
    }
}
exports.AgendaService = AgendaService;
