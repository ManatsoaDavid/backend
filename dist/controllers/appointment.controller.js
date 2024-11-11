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
exports.AppointmentController = void 0;
const appointment_service_1 = require("../services/appointment.service");
class AppointmentController {
    constructor() {
        this.appointmentService = new appointment_service_1.AppointmentService();
    }
    createAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { visitorId, availabilityId, reason, dateAppointment } = req.body;
                const newAppointment = yield this.appointmentService.createAppointment(visitorId, availabilityId, reason, dateAppointment);
                response = {
                    success: true,
                    data: newAppointment,
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
    getAllAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const appointments = yield this.appointmentService.getAllAppointments();
                response = {
                    success: true,
                    data: appointments,
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
    getAppointmentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { id } = req.params;
                const appointment = yield this.appointmentService.getAppointmentById(parseInt(id));
                if (appointment) {
                    response = {
                        success: true,
                        data: appointment,
                    };
                    status = 200;
                }
                else {
                    response = {
                        success: false,
                        message: 'Appointment not found',
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
    updateAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { id } = req.params;
                const updatedData = req.body;
                const updatedAppointment = yield this.appointmentService.updateAppointment(parseInt(id), updatedData);
                if (updatedAppointment) {
                    response = {
                        success: true,
                        data: updatedAppointment,
                    };
                    status = 200;
                }
                else {
                    response = {
                        success: false,
                        message: 'Appointment not found',
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
    deleteAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { id } = req.params;
                const deleted = yield this.appointmentService.deleteAppointment(parseInt(id));
                if (deleted) {
                    response = {
                        success: true,
                    };
                    status = 204;
                }
                else {
                    response = {
                        success: false,
                        message: 'Appointment not found',
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
    getAppointmentsForVisitor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { visitorId } = req.params;
                const appointments = yield this.appointmentService.getAppointmentsForVisitor(parseInt(visitorId));
                response = {
                    success: true,
                    data: appointments,
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
    getAppointmentsForPractitioner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { practitionerId } = req.params;
                const appointments = yield this.appointmentService.getAppointmentsForPractitioner(parseInt(practitionerId));
                response = {
                    success: true,
                    data: appointments,
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
    getAppointmentsByStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let statusCode;
            try {
                const { practitionerId, status } = req.query;
                const appointments = yield this.appointmentService.getAppointmentsByStatus(parseInt(practitionerId), status);
                response = {
                    success: true,
                    data: appointments,
                };
                statusCode = 200;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(statusCode).json(response);
        });
    }
    confirmAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { id } = req.params;
                const confirmedAppointment = yield this.appointmentService.confirmAppointment(parseInt(id));
                if (confirmedAppointment) {
                    response = {
                        success: true,
                        data: confirmedAppointment,
                    };
                    status = 200;
                }
                else {
                    response = {
                        success: false,
                        message: 'Appointment not found',
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
    rejectAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { id } = req.params;
                const { reason } = req.body;
                const rejectedAppointment = yield this.appointmentService.rejectAppointment(parseInt(id), reason);
                if (rejectedAppointment) {
                    response = {
                        success: true,
                        data: rejectedAppointment,
                    };
                    status = 200;
                }
                else {
                    response = {
                        success: false,
                        message: 'Appointment not found',
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
    postponeAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { id } = req.params;
                const { newDate } = req.body;
                const postponedAppointment = yield this.appointmentService.postponeAppointment(parseInt(id), newDate);
                if (postponedAppointment) {
                    response = {
                        success: true,
                        data: postponedAppointment,
                    };
                    status = 200;
                }
                else {
                    response = {
                        success: false,
                        message: 'Appointment not found',
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
    cancelAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { id } = req.params;
                const { reason } = req.body;
                const cancelledAppointment = yield this.appointmentService.cancelAppointment(parseInt(id), reason);
                if (cancelledAppointment) {
                    response = {
                        success: true,
                        data: cancelledAppointment,
                    };
                    status = 200;
                }
                else {
                    response = {
                        success: false,
                        message: 'Appointment not found',
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
    handleError(error, res) {
        console.error('Error in the appointment controller:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred',
        });
    }
    /**********CHECK APPOINTMENTDATE********* */
    getExistingAppointmentsForAvailability(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { availabilityId } = req.params;
                const existingAppointments = yield this.appointmentService.getExistingAppointmentsForAvailability(parseInt(availabilityId));
                res.status(200).json({ success: true, data: existingAppointments });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
    }
}
exports.AppointmentController = AppointmentController;
