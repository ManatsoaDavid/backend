import SqAgenda from "../sequelize-model/SqAgenda";
import { SqAppointment } from "../sequelize-model/SqAppointment";
import { SqAvailability } from "../sequelize-model/SqAvailability";
import SqPractitioner from "../sequelize-model/SqPractitioner";
import { SqVisitor } from "../sequelize-model/SqVisitor";
import { CustomError } from "../util/error";

export class AppointmentService {
  // Create a new appointment
  public async createAppointment(visitorId: number, availabilityId: number, reason: string, dateAppointment: number): Promise<SqAppointment> {
    try {
      // Check if the availability exists
      const availability = await SqAvailability.findByPk(availabilityId, {
        include: [{ model: SqAgenda, include: [SqPractitioner] }],
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
      const appointment = await SqAppointment.create({
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
    } catch (error) {
      // Handle and log the error
      if (error instanceof CustomError) {
        throw error;
      } else {
        console.error('Error creating appointment:', error);
        throw new CustomError(500, 'An error occurred while creating the appointment');
      }
    }
  }

  // Get all appointments
  public async getAllAppointments(): Promise<SqAppointment[]> {
    try {
      const appointments = await SqAppointment.findAll({
        include: [SqAvailability, SqVisitor],
      });
      return appointments;
    } catch (error) {
      // Handle and log the error
      console.error('Error fetching appointments:', error);
      throw new CustomError(500, 'An error occurred while fetching appointments');
    }
  }

  // Get an appointment by ID
  public async getAppointmentById(appointmentId: number): Promise<SqAppointment | null> {
    try {
      const appointment = await SqAppointment.findByPk(appointmentId, {
        include: [SqAvailability, SqVisitor],
      });
      return appointment;
    } catch (error) {
      // Handle and log the error
      console.error(`Error fetching appointment with ID ${appointmentId}:`, error);
      throw new CustomError(500, 'An error occurred while fetching the appointment');
    }
  }

  // Update an appointment
  public async updateAppointment(appointmentId: number, updatedData: Partial<SqAppointment>): Promise<SqAppointment | null> {
    try {
      const appointment = await SqAppointment.findByPk(appointmentId);
      if (!appointment) {
        console.error(`Appointment with ID ${appointmentId} not found`);
        return null;
      }

      await appointment.update(updatedData);
      return appointment;
    } catch (error) {
      // Handle and log the error
      console.error(`Error updating appointment with ID ${appointmentId}:`, error);
      throw new CustomError(500, 'An error occurred while updating the appointment');
    }
  }

  // Delete an appointment
  public async deleteAppointment(appointmentId: number): Promise<boolean> {
    try {
      const appointment = await SqAppointment.findByPk(appointmentId);
      if (!appointment) {
        console.error(`Appointment with ID ${appointmentId} not found`);
        return false;
      }

      await appointment.destroy();
      return true;
    } catch (error) {
      // Handle and log the error
      console.error(`Error deleting appointment with ID ${appointmentId}:`, error);
      throw new CustomError(500, 'An error occurred while deleting the appointment');
    }
  }

  // Get all appointments for a visitor
  public async getAppointmentsForVisitor(visitorId: number): Promise<SqAppointment[]> {
    try {
      const appointments = await SqAppointment.findAll({
        where: { visitorId },
        include: [SqAvailability, SqVisitor],
      });
      return appointments;
    } catch (error) {
      // Handle and log the error
      console.error(`Error fetching appointments for visitor with ID ${visitorId}:`, error);
      throw new CustomError(500, 'An error occurred while fetching appointments for the visitor');
    }
  }

  // Get all appointments for a practitioner
  public async getAppointmentsForPractitioner(practitionerId: number): Promise<SqAppointment[]> {
    try {
      const appointments = await SqAppointment.findAll({
        include: [
          {
            model: SqAvailability,
            required: true,
            include: [{ model: SqAgenda, required: true, where: { practitionerId } }],
          },
          SqVisitor,
        ],
      });
      return appointments;
    } catch (error) {
      // Handle and log the error
      console.error(`Error fetching appointments for practitioner with ID ${practitionerId}:`, error);
      throw new CustomError(500, 'An error occurred while fetching appointments for the practitioner');
    }
  }

  // Get appointments by status for a practitioner
  public async getAppointmentsByStatus(practitionerId: number, status: string): Promise<SqAppointment[]> {
    try {
      const appointments = await SqAppointment.findAll({
        include: [
          {
            model: SqAvailability,
            include: [{ model: SqAgenda, where: { practitionerId } }],
          },
          SqVisitor,
        ],
        where: { status },
      });
      return appointments;
    } catch (error) {
      // Handle and log the error
      console.error(`Error fetching appointments by status for practitioner with ID ${practitionerId}:`, error);
      throw new CustomError(500, 'An error occurred while fetching appointments by status');
    }
  }

  // Confirm an appointment
  public async confirmAppointment(appointmentId: number): Promise<SqAppointment | null> {
    try {
      const appointment = await SqAppointment.findByPk(appointmentId, {
        include: [{ model: SqAvailability, as: 'practitionerAppointments' }]
      });
      if (!appointment) {
        console.error(`Appointment with ID ${appointmentId} not found`);
        return null;
      }

      await appointment.update({
        status: "CONFIRME",
        updatedAt: Date.now()
      });

      // Notify the visitor
      this.notifyVisitor(appointment.visitorId, appointment);

      return appointment;
    } catch (error) {
      // Handle and log the error
      console.error(`Error confirming appointment with ID ${appointmentId}:`, error);
      throw new CustomError(500, 'An error occurred while confirming the appointment');
    }
  }

  // Reject an appointment
  public async rejectAppointment(appointmentId: number, reason: string): Promise<SqAppointment | null> {
    try {
      const appointment = await SqAppointment.findByPk(appointmentId);
      if (!appointment) {
        console.error(`Appointment with ID ${appointmentId} not found`);
        return null;
      }

      appointment.status = "REPORTE";
      appointment.rejectionReason = reason;
      appointment.updatedAt = Date.now();
      await appointment.save();

      // Notify the visitor
      this.notifyVisitor(appointment.visitorId, appointment);

      return appointment;
    } catch (error) {
      // Handle and log the error
      console.error(`Error rejecting appointment with ID ${appointmentId}:`, error);
      throw new CustomError(500, 'An error occurred while rejecting the appointment');
    }
  }

  // Postpone an appointment
  public async postponeAppointment(appointmentId: number, newDate: number): Promise<SqAppointment | null> {
    try {
      const appointment = await SqAppointment.findByPk(appointmentId);
      if (!appointment) {
        console.error(`Appointment with ID ${appointmentId} not found`);
        return null;
      }

      appointment.status = "REPORTE";
      appointment.postponedDate = newDate;
      appointment.updatedAt = Date.now();
      await appointment.save();

      // Notify the visitor
      this.notifyVisitor(appointment.visitorId, appointment);

      return appointment;
    } catch (error) {
      // Handle and log the error
      console.error(`Error postponing appointment with ID ${appointmentId}:`, error);
      throw new CustomError(500, 'An error occurred while postponing the appointment');
    }
  }

  // Cancel an appointment
  public async cancelAppointment(appointmentId: number, reason: string): Promise<SqAppointment | null> {
    try {
      const appointment = await SqAppointment.findByPk(appointmentId);
      if (!appointment) {
        console.error(`Appointment with ID ${appointmentId} not found`);
        return null;
      }

      appointment.status = "ANNULER";
      appointment.cancellationReason = reason;
      appointment.updatedAt = Date.now();
      await appointment.save();

      if (appointment.availabilityId) {
        await SqAvailability.update(
          { status: "DISPONIBLE" },
          { where: { availabilityId: appointment.availabilityId } }
        );
      }

      // Notify the visitor
      this.notifyVisitor(appointment.visitorId, appointment);

      return appointment;
    } catch (error) {
      // Handle and log the error
      console.error(`Error canceling appointment with ID ${appointmentId}:`, error);
      throw new CustomError(500, 'An error occurred while canceling the appointment');
    }
  }

  private async notifyPractitioner(practitionerId: number, appointment: SqAppointment): Promise<void> {
    // Implement the logic to send a notification to the practitioner
    console.log(`Notifying practitioner ${practitionerId} about a new appointment: ${appointment.appointmentId}`);
  }

  private async notifyVisitor(visitorId: number, appointment: SqAppointment): Promise<void> {
    // Implement the logic to send a notification to the visitor
    console.log(`Notifying visitor ${visitorId} about the appointment status change: ${appointment.appointmentId}`);
  }

  /*****************CHECK DATE APPOINTMENT************* */

  public async getExistingAppointmentsForAvailability(availabilityId: number): Promise<number[]> {
    try {
      const appointments = await SqAppointment.findAll({
        where: { availabilityId },
        attributes: ['dateAppointment']
      });
      return appointments.map(appointment => appointment.dateAppointment);
    } catch (error) {
      // Handle and log the error
      console.error(`Error fetching existing appointments for availability with ID ${availabilityId}:`, error);
      throw new CustomError(500, 'An error occurred while fetching existing appointments');
    }
  }
}
