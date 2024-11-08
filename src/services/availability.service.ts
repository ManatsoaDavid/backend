import { Op } from "sequelize";
import { IAvailability } from "../models/availability.model";
import { SqAgenda } from "../sequelize-model/SqAgenda";
import SqAvailability from "../sequelize-model/SqAvailability";
import { CustomError } from "../util/error";

export class AvailabilityService {
  // Fonction utilitaire pour convertir une date en timestamp (nombre de millisecondes depuis le 1er janvier 1970)
  private convertDateToTimestamp(date: Date): number {
    return date.getTime();
  }

  // Fonction utilitaire pour convertir un timestamp en date
  private convertTimestampToDate(timestamp: number): Date {
    return new Date(timestamp);
  }

  // Créer une nouvelle disponibilité pour un agenda donné
  public async createAvailability(availabilityData: { agendaId: number; startTime: number; endTime: number; status: string }): Promise<SqAvailability> {
    try {
      const { agendaId, startTime, endTime, status } = availabilityData;

      // Vérifier si l'agenda existe
      const agenda = await SqAgenda.findByPk(agendaId);
      if (!agenda) {
        throw new CustomError(404, "Agenda not found");
      }

      // Créer la nouvelle disponibilité
      const newAvailability = await SqAvailability.create({
        agendaId,
        startTime,
        endTime,
        status,
      });

      return newAvailability;
    } catch (error) {
      throw new CustomError(500, "Error creating availability");
    }
  }

  // Récupérer toutes les disponibilités avec leurs agendas associés
  public async getAvailability(): Promise<IAvailability[]> {
    try {
      const availabilities = await SqAvailability.findAll({ include: SqAgenda });
      return availabilities.map((availability) => ({
        availabilityId: availability.availabilityId,
        status: availability.status,
        date: this.convertTimestampToDate(availability.date).getTime(),
        startTime: this.convertTimestampToDate(availability.startTime).getTime(),
        endTime: this.convertTimestampToDate(availability.endTime).getTime(),
      }));
    } catch (error) {
      throw new CustomError(500, 'Error fetching availabilities');
    }
  }

  // Récupérer les disponibilités d'un agenda spécifique
  public async getAvailabilitiesByAgendaId(agendaId: number): Promise<SqAvailability[]> {
    try {
      const availabilities = await SqAvailability.findAll({
        where: { agendaId },
      });
      return availabilities;
    } catch (error) {
      throw new CustomError(500, 'Error fetching availabilities by agenda ID');
    }
  }

  // Récupérer les disponibilités d'un praticien pour un jour donné
  public async getAvailabilitiesByDay(practitionerId: number, date: Date): Promise<SqAvailability[]> {
    try {
      const agenda = await SqAgenda.findOne({ where: { practitionerId } });
      if (!agenda) {
        return [];
      }

      const availabilities = await SqAvailability.findAll({
        where: {
          agendaId: agenda.agendaId,
          date: this.convertDateToTimestamp(date),
        },
      });

      return availabilities;
    } catch (error) {
      throw new CustomError(500, 'Error fetching availabilities for the day');
    }
  }

  // Récupérer les disponibilités d'un praticien pour une semaine donnée
  public async getAvailabilitiesByWeek(practitionerId: number, date: Date): Promise<SqAvailability[]> {
    try {
      const agenda = await SqAgenda.findOne({ where: { practitionerId } });
      if (!agenda) {
        return [];
      }

      // Calculer le début et la fin de la semaine
      const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
      const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);

      const availabilities = await SqAvailability.findAll({
        where: {
          agendaId: agenda.agendaId,
          date: {
            [Op.between]: [this.convertDateToTimestamp(startDate), this.convertDateToTimestamp(endDate)],
          },
        },
      });

      return availabilities;
    } catch (error) {
      throw new CustomError(500, 'Error fetching availabilities for the week');
    }
  }

  // Récupérer les disponibilités d'un praticien pour un mois donné
  public async getAvailabilitiesByMonth(practitionerId: number, date: Date): Promise<SqAvailability[]> {
    try {
      const agenda = await SqAgenda.findOne({ where: { practitionerId } });
      if (!agenda) {
        return [];
      }

      // Calculer le début et la fin du mois
      const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const availabilities = await SqAvailability.findAll({
        where: {
          agendaId: agenda.agendaId,
          date: {
            [Op.between]: [this.convertDateToTimestamp(startDate), this.convertDateToTimestamp(endDate)],
          },
        },
      });

      return availabilities;
    } catch (error) {
      throw new CustomError(500, 'Error fetching availabilities for the month');
    }
  }

  // Mettre à jour une disponibilité existante
  public async updateAvailability(availabilityId: number, availabilityData: Partial<IAvailability>): Promise<IAvailability> {
    try {
      const availability = await SqAvailability.findByPk(availabilityId);
      if (!availability) {
        throw new CustomError(404, 'Availability not found');
      }

      // Convertir les dates en timestamps avant la mise à jour
      const updatedData: Partial<SqAvailability> = {
        ...availabilityData,
        date: availabilityData.date ? this.convertDateToTimestamp(new Date(availabilityData.date)) : undefined,
        startTime: availabilityData.startTime ? this.convertDateToTimestamp(new Date(availabilityData.startTime)) : undefined,
        endTime: availabilityData.endTime ? this.convertDateToTimestamp(new Date(availabilityData.endTime)) : undefined,
      };

      await availability.update(updatedData);

      // Retourner l'availability avec les dates converties en timestamps
      return {
        availabilityId: availability.availabilityId,
        status: availability.status,
        date: this.convertTimestampToDate(availability.date).getTime(),
        startTime: this.convertTimestampToDate(availability.startTime).getTime(),
        endTime: this.convertTimestampToDate(availability.endTime).getTime(),
      };
    } catch (error) {
      throw new CustomError(500, 'Error updating availability');
    }
  }

  // Supprimer une disponibilité
  public async deleteAvailability(availabilityId: number): Promise<void> {
    try {
      const availability = await SqAvailability.findByPk(availabilityId);
      if (!availability) {
        throw new CustomError(404, 'Availability not found');
      }

      await availability.destroy();
    } catch (error) {
      throw new CustomError(500, 'Error deleting availability');
    }
  }
}
