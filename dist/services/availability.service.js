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
exports.AvailabilityService = void 0;
const sequelize_1 = require("sequelize");
const SqAgenda_1 = require("../sequelize-model/SqAgenda");
const SqAvailability_1 = __importDefault(require("../sequelize-model/SqAvailability"));
const error_1 = require("../util/error");
class AvailabilityService {
    // Fonction utilitaire pour convertir une date en timestamp (nombre de millisecondes depuis le 1er janvier 1970)
    convertDateToTimestamp(date) {
        return date.getTime();
    }
    // Fonction utilitaire pour convertir un timestamp en date
    convertTimestampToDate(timestamp) {
        return new Date(timestamp);
    }
    // Créer une nouvelle disponibilité pour un agenda donné
    createAvailability(availabilityData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { agendaId, startTime, endTime, status } = availabilityData;
                // Vérifier si l'agenda existe
                const agenda = yield SqAgenda_1.SqAgenda.findByPk(agendaId);
                if (!agenda) {
                    throw new error_1.CustomError(404, "Agenda not found");
                }
                // Créer la nouvelle disponibilité
                const newAvailability = yield SqAvailability_1.default.create({
                    agendaId,
                    startTime,
                    endTime,
                    status,
                });
                return newAvailability;
            }
            catch (error) {
                throw new error_1.CustomError(500, "Error creating availability");
            }
        });
    }
    // Récupérer toutes les disponibilités avec leurs agendas associés
    getAvailability() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const availabilities = yield SqAvailability_1.default.findAll({ include: SqAgenda_1.SqAgenda });
                return availabilities.map((availability) => ({
                    availabilityId: availability.availabilityId,
                    status: availability.status,
                    date: this.convertTimestampToDate(availability.date).getTime(),
                    startTime: this.convertTimestampToDate(availability.startTime).getTime(),
                    endTime: this.convertTimestampToDate(availability.endTime).getTime(),
                }));
            }
            catch (error) {
                throw new error_1.CustomError(500, 'Error fetching availabilities');
            }
        });
    }
    // Récupérer les disponibilités d'un agenda spécifique
    getAvailabilitiesByAgendaId(agendaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const availabilities = yield SqAvailability_1.default.findAll({
                    where: { agendaId },
                });
                return availabilities;
            }
            catch (error) {
                throw new error_1.CustomError(500, 'Error fetching availabilities by agenda ID');
            }
        });
    }
    // Récupérer les disponibilités d'un praticien pour un jour donné
    getAvailabilitiesByDay(practitionerId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agenda = yield SqAgenda_1.SqAgenda.findOne({ where: { practitionerId } });
                if (!agenda) {
                    return [];
                }
                const availabilities = yield SqAvailability_1.default.findAll({
                    where: {
                        agendaId: agenda.agendaId,
                        date: this.convertDateToTimestamp(date),
                    },
                });
                return availabilities;
            }
            catch (error) {
                throw new error_1.CustomError(500, 'Error fetching availabilities for the day');
            }
        });
    }
    // Récupérer les disponibilités d'un praticien pour une semaine donnée
    getAvailabilitiesByWeek(practitionerId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agenda = yield SqAgenda_1.SqAgenda.findOne({ where: { practitionerId } });
                if (!agenda) {
                    return [];
                }
                // Calculer le début et la fin de la semaine
                const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
                const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);
                const availabilities = yield SqAvailability_1.default.findAll({
                    where: {
                        agendaId: agenda.agendaId,
                        date: {
                            [sequelize_1.Op.between]: [this.convertDateToTimestamp(startDate), this.convertDateToTimestamp(endDate)],
                        },
                    },
                });
                return availabilities;
            }
            catch (error) {
                throw new error_1.CustomError(500, 'Error fetching availabilities for the week');
            }
        });
    }
    // Récupérer les disponibilités d'un praticien pour un mois donné
    getAvailabilitiesByMonth(practitionerId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agenda = yield SqAgenda_1.SqAgenda.findOne({ where: { practitionerId } });
                if (!agenda) {
                    return [];
                }
                // Calculer le début et la fin du mois
                const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
                const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                const availabilities = yield SqAvailability_1.default.findAll({
                    where: {
                        agendaId: agenda.agendaId,
                        date: {
                            [sequelize_1.Op.between]: [this.convertDateToTimestamp(startDate), this.convertDateToTimestamp(endDate)],
                        },
                    },
                });
                return availabilities;
            }
            catch (error) {
                throw new error_1.CustomError(500, 'Error fetching availabilities for the month');
            }
        });
    }
    // Mettre à jour une disponibilité existante
    updateAvailability(availabilityId, availabilityData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const availability = yield SqAvailability_1.default.findByPk(availabilityId);
                if (!availability) {
                    throw new error_1.CustomError(404, 'Availability not found');
                }
                // Convertir les dates en timestamps avant la mise à jour
                const updatedData = Object.assign(Object.assign({}, availabilityData), { date: availabilityData.date ? this.convertDateToTimestamp(new Date(availabilityData.date)) : undefined, startTime: availabilityData.startTime ? this.convertDateToTimestamp(new Date(availabilityData.startTime)) : undefined, endTime: availabilityData.endTime ? this.convertDateToTimestamp(new Date(availabilityData.endTime)) : undefined });
                yield availability.update(updatedData);
                // Retourner l'availability avec les dates converties en timestamps
                return {
                    availabilityId: availability.availabilityId,
                    status: availability.status,
                    date: this.convertTimestampToDate(availability.date).getTime(),
                    startTime: this.convertTimestampToDate(availability.startTime).getTime(),
                    endTime: this.convertTimestampToDate(availability.endTime).getTime(),
                };
            }
            catch (error) {
                throw new error_1.CustomError(500, 'Error updating availability');
            }
        });
    }
    // Supprimer une disponibilité
    deleteAvailability(availabilityId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const availability = yield SqAvailability_1.default.findByPk(availabilityId);
                if (!availability) {
                    throw new error_1.CustomError(404, 'Availability not found');
                }
                yield availability.destroy();
            }
            catch (error) {
                throw new error_1.CustomError(500, 'Error deleting availability');
            }
        });
    }
}
exports.AvailabilityService = AvailabilityService;
