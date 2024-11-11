import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller";

const appointmentRoutes = Router();
const appointmentController = new AppointmentController();

appointmentRoutes.post('/', (req, res) => appointmentController.createAppointment(req, res));
appointmentRoutes.get('/', (req, res) => appointmentController.getAllAppointments(req, res));
appointmentRoutes.get('/:id', (req, res) => appointmentController.getAppointmentById(req, res));
appointmentRoutes.put('/:id', (req, res) => appointmentController.updateAppointment(req, res));
appointmentRoutes.delete('/:id', (req, res) => appointmentController.deleteAppointment(req, res));
appointmentRoutes.get('/visitor/:visitorId', (req, res) => appointmentController.getAppointmentsForVisitor(req, res));
appointmentRoutes.get('/practitioner/:practitionerId', (req, res) => appointmentController.getAppointmentsForPractitioner(req, res));
appointmentRoutes.get('/status', (req, res) => appointmentController.getAppointmentsByStatus(req, res));
appointmentRoutes.put('/confirm/:id', (req, res) => appointmentController.confirmAppointment(req, res));
appointmentRoutes.put('/reject/:id', (req, res) => appointmentController.rejectAppointment(req, res));
appointmentRoutes.put('/postpone/:id', (req, res) => appointmentController.postponeAppointment(req, res));
appointmentRoutes.put('/cancel/:id', (req, res) => appointmentController.cancelAppointment(req, res));

/*************CHECK APPOINTMENT DATE****** */

appointmentRoutes.get('/existing/:availabilityId', (req, res) => appointmentController.getExistingAppointmentsForAvailability(req, res));


export default appointmentRoutes;
