import { IAgenda } from "../models/agenda.model";
import SqAgenda from "../sequelize-model/SqAgenda";
import SqAvailability from "../sequelize-model/SqAvailability";
import SqPractitioner from "../sequelize-model/SqPractitioner";
import { CustomError } from "../util/error";
import { ERROR_MESSAGES } from "../util/error-messages";
export class AgendaService {
  public async createAgenda(agendaData: IAgenda): Promise<IAgenda> {
    try {
      const practitioner = await SqPractitioner.findByPk(agendaData.practitionerId);
      if (!practitioner) {
        throw new CustomError(404, 'Le praticien n\'existe pas');
      }

      const agenda = await SqAgenda.create({
        practitionerId: agendaData.practitionerId,
        category: agendaData.category,
      });

      return agenda.get({ plain: true }) as IAgenda;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(500, ERROR_MESSAGES.AGENDA_CREATE_ERROR);
      }
    }
  }

  public async getAgendas(): Promise<IAgenda[]> {
    try {
      const agendas = await SqAgenda.findAll();
      return agendas.map((agenda) => agenda.get({ plain: true }) as IAgenda);
    } catch (error) {
      throw new CustomError(500, ERROR_MESSAGES.AGENDA_FETCH_ERROR);
    }
  }

  public async getAgendaById(agendaId: number): Promise<IAgenda> {
    try {
      const agenda = await SqAgenda.findByPk(agendaId);
      if (!agenda) {
        throw new CustomError(404, 'Agenda not found');
      }
      return agenda.get({ plain: true }) as IAgenda;
    } catch (error) {
      throw error;
    }
  }

  public async getAgendaByPractitionerId(practitionerId: number): Promise<IAgenda[]> {
    try {
      const agendas = await SqAgenda.findAll({
        where: {
          practitionerId: practitionerId,
        },
        include: [
          {
            model: SqAvailability,
            as: 'availabilities',
          },
        ],
      });
      return agendas.map((agenda) => agenda.get({ plain: true }) as IAgenda);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(500, ERROR_MESSAGES.AGENDA_FETCH_ERROR);
      }
    }
  }


  public async updateAgenda(agendaId: number, agendaData: Partial<IAgenda>): Promise<IAgenda> {
    try {
      const agenda = await SqAgenda.findByPk(agendaId);
      if (!agenda) {
        throw new CustomError(404, 'Agenda not found');
      }
      await agenda.update(agendaData);
      return agenda.get({ plain: true }) as IAgenda;
    } catch (error) {
      throw error;
    }
  }

  public async deleteAgenda(agendaId: number): Promise<void> {
    try {
      // Récupérer l'agenda à supprimer
      const agenda = await SqAgenda.findByPk(agendaId);
      if (!agenda) {
        throw new CustomError(404, 'Agenda not found');
      }

      // Supprimer les disponibilités associées à l'agenda
      await SqAvailability.destroy({
        where: {
          agendaId: agendaId,
        },
      });

      // Supprimer l'agenda
      await agenda.destroy();
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(500, ERROR_MESSAGES.AGENDA_DELETE_ERROR);
      }
    }
  }







}
