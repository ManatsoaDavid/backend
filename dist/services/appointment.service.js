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
exports.AppointmentService = void 0;
const SqAgenda_1 = __importDefault(require("../sequelize-model/SqAgenda"));
const SqAppointment_1 = require("../sequelize-model/SqAppointment");
const SqAvailability_1 = require("../sequelize-model/SqAvailability");
const SqPractitioner_1 = __importDefault(require("../sequelize-model/SqPractitioner"));
const SqVisitor_1 = require("../sequelize-model/SqVisitor");
const error_1 = require("../util/error");
class AppointmentService {
    // Create a new appointment
    createAppointment(visitorId, availabilityId, reason, dateAppointment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the availability exists
                const availability = yield SqAvailability_1.SqAvailability.findByPk(availabilityId, {
                    include: [{ model: SqAgenda_1.default, include: [SqPractitioner_1.default] }],
                });
                if (!availability) {
                    console.error(`Availability with ID ${availabilityId} not found`);
                    throw new Error("Availability not found");
                }
                // Check if the availability status is "DISPONIBLE"
                if (availability.status !== "DISPONIBLE") {
                    throw new Error("Availability is not available");
                }
                // Create the new appointment
                const appointment = yield SqAppointment_1.SqAppointment.create({
                    visitorId,
                    availabilityId,
                    status: "EN ATTENTE",
                    reason,
                    dateAppointment,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                });
                // Notify the practitioner about the new appointment
                this.notifyPractitioner(availability.agenda.practitioner.practitionerId, appointment);
                return appointment;
            }
            catch (error) {
                // Handle and log the error
                if (error instanceof error_1.CustomError) {
                    throw error;
                }
                else {
                    console.error('Error creating appointment:', error);
                    throw new error_1.CustomError(500, 'An error occurred while creating the appointment');
                }
            }
        });
    }
    // Get all appointments
    getAllAppointments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield SqAppointment_1.SqAppointment.findAll({
                    include: [SqAvailability_1.SqAvailability, SqVisitor_1.SqVisitor],
                });
                return appointments;
            }
            catch (error) {
                // Handle and log the error
                console.error('Error fetching appointments:', error);
                throw new error_1.CustomError(500, 'An error occurred while fetching appointments');
            }
        });
    }
    // Get an appointment by ID
    getAppointmentById(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield SqAppointment_1.SqAppointment.findByPk(appointmentId, {
                    include: [SqAvailability_1.SqAvailability, SqVisitor_1.SqVisitor],
                });
                return appointment;
            }
            catch (error) {
                // Handle and log the error
                console.error(`Error fetching appointment with ID ${appointmentId}:`, error);
                throw new error_1.CustomError(500, 'An error occurred while fetching the appointment');
            }
        });
    }
    // Update an appointment
    updateAppointment(appointmentId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield SqAppointment_1.SqAppointment.findByPk(appointmentId);
                if (!appointment) {
                    console.error(`Appointment with ID ${appointmentId} not found`);
                    return null;
                }
                yield appointment.update(updatedData);
                return appointment;
            }
            catch (error) {
                // Handle and log the error
                console.error(`Error updating appointment with ID ${appointmentId}:`, error);
                throw new error_1.CustomError(500, 'An error occurred while updating the appointment');
            }
        });
    }
    // Delete an appointment
    deleteAppointment(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield SqAppointment_1.SqAppointment.findByPk(appointmentId);
                if (!appointment) {
                    console.error(`Appointment with ID ${appointmentId} not found`);
                    return false;
                }
                yield appointment.destroy();
                return true;
            }
            catch (error) {
                // Handle and log the error
                console.error(`Error deleting appointment with ID ${appointmentId}:`, error);
                throw new error_1.CustomError(500, 'An error occurred while deleting the appointment');
            }
        });
    }
    // Get all appointments for a visitor
    getAppointmentsForVisitor(visitorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield SqAppointment_1.SqAppointment.findAll({
                    where: { visitorId },
                    include: [SqAvailability_1.SqAvailability, SqVisitor_1.SqVisitor],
                });
                return appointments;
            }
            catch (error) {
                // Handle and log the error
                console.error(`Error fetching appointments for visitor with ID ${visitorId}:`, error);
                throw new error_1.CustomError(500, 'An error occurred while fetching appointments for the visitor');
            }
        });
    }
    // Get all appointments for a practitioner
    getAppointmentsForPractitioner(practitionerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield SqAppointment_1.SqAppointment.findAll({
                    include: [
                        {
                            model: SqAvailability_1.SqAvailability,
                            required: true,
                            include: [{ model: SqAgenda_1.default, required: true, where: { practitionerId } }],
                        },
                        SqVisitor_1.SqVisitor,
                    ],
                });
                return appointments;
            }
            catch (error) {
                // Handle and log the error
                console.error(`Error fetching appointments for practitioner with ID ${practitionerId}:`, error);
                throw new error_1.CustomError(500, 'An error occurred while fetching appointments for the practitioner');
            }
        });
    }
    // Get appointments by status for a practitioner
    getAppointmentsByStatus(practitionerId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield SqAppointment_1.SqAppointment.findAll({
                    include: [
                        {
                            model: SqAvailability_1.SqAvailability,
                            include: [{ model: SqAgenda_1.default, where: { practitionerId } }],
                        },
                        SqVisitor_1.SqVisitor,
                    ],
                    where: { status },
                });
                return appointments;
            }
            catch (error) {
                // Handle and log the error
                console.error(`Error fetching appointments by status for practitioner with ID ${practitionerId}:`, error);
                throw new error_1.CustomError(500, 'An error occurred while fetching appointments by status');
            }
        });
    }
    // Confirm an appointment
    confirmAppointment(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield SqAppointment_1.SqAppointment.findByPk(appointmentId, {
                    include: [{ model: SqAvailability_1.SqAvailability, as: 'practitionerAppointments' }]
                });
                if (!appointment) {
                    console.error(`Appointment with ID ${appointmentId} not found`);
                    return null;
                }
                yield appointment.update({
                    status: "CONFIRME",
                    updatedAt: Date.now()
                });
                // Notify the visitor
                this.notifyVisitor(appointment.visitorId, appointment);
                return appointment;
            }
            catch (error) {
                // Handle and log the error
                console.error(`Error confirming appointment with ID ${appointmentId}:`, error);
                throw new error_1.CustomError(500, 'An error occurred while confirming the appointment');
            }
        });
    }
    // Reject an appointment
    rejectAppointment(appointmentId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield SqAppointment_1.SqAppointment.findByPk(appointmentId);
                if (!appointment) {
                    console.error(`Appointment with ID ${appointmentId} not found`);
                    return null;
                }
                appointment.status = "REPORTE";
                appointment.rejectionReason = reason;
                appointment.updatedAt = Date.now();
                yield appointment.save();
                // Notify the visitor
                this.notifyVisitor(appointment.visitorId, appointment);
                return appointment;
            }
            catch (error) {
                // Handle and log the error
                console.error(`Error rejecting appointment with ID ${appointmentId}:`, error);
                throw new error_1.CustomError(500, 'An error occurred while rejecting the appointment');
            }
        });
    }
    // Postpone an appointment
    postponeAppointment(appointmentId, newDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield SqAppointment_1.SqAppointment.findByPk(appointmentId);
                if (!appointment) {
                    console.error(`Appointment with ID ${appointmentId} not found`);
                    return null;
                }
                appointment.status = "REPORTE";
                appointment.postponedDate = newDate;
                appointment.updatedAt = Date.now();
                yield appointment.save();
                // Notify the visitor
                this.notifyVisitor(appointment.visitorId, appointment);
                return appointment;
            }
            catch (error) {
                // Handle and log the error
                console.error(`Error postponing appointment with ID ${appointmentId}:`, error);
                throw new error_1.CustomError(500, 'An error occurred while postponing the appointment');
            }
        });
    }
    // Cancel an appointment
    cancelAppointment(appointmentId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointment = yield SqAppointment_1.SqAppointment.findByPk(appointmentId);
                if (!appointment) {
                    console.error(`Appointment with ID ${appointmentId} not found`);
                    return null;
                }
                appointment.status = "ANNULER";
                appointment.cancellationReason = reason;
                appointment.updatedAt = Date.now();
                yield appointment.save();
                if (appointment.availabilityId) {
                    yield SqAvailability_1.SqAvailability.update({ status: "DISPONIBLE" }, { where: { availabilityId: appointment.availabilityId } });
                }
                // Notify the visitor
                this.notifyVisitor(appointment.visitorId, appointment);
                return appointment;
            }
            catch (error) {
                // Handle and log the error
                console.error(`Error canceling appointment with ID ${appointmentId}:`, error);
                throw new error_1.CustomError(500, 'An error occurred while canceling the appointment');
            }
        });
    }
    notifyPractitioner(practitionerId, appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement the logic to send a notification to the practitioner
            console.log(`Notifying practitioner ${practitionerId} about a new appointment: ${appointment.appointmentId}`);
        });
    }
    notifyVisitor(visitorId, appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement the logic to send a notification to the visitor
            console.log(`Notifying visitor ${visitorId} about the appointment status change: ${appointment.appointmentId}`);
        });
    }
    /*****************CHECK DATE APPOINTMENT************* */
    getExistingAppointmentsForAvailability(availabilityId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield SqAppointment_1.SqAppointment.findAll({
                    where: { availabilityId },
                    attributes: ['dateAppointment']
                });
                return appointments.map(appointment => appointment.dateAppointment);
            }
            catch (error) {
                // Handle and log the error
                console.error(`Error fetching existing appointments for availability with ID ${availabilityId}:`, error);
                throw new error_1.CustomError(500, 'An error occurred while fetching existing appointments');
            }
        });
    }
}
exports.AppointmentService = AppointmentService;
