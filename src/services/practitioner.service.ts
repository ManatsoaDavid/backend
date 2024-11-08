import { IPractitioner } from "../models/practitioner.model";
import { SqPractitioner } from "../sequelize-model/SqPractitioner";
import SqUser from '../sequelize-model/SqUser';
import { CustomError } from "../util/error";

export class PractitionerService {
  // Créer un nouveau praticien avec validation des données
  public async createPractitioner(practitionerData: IPractitioner): Promise<IPractitioner> {
    try {
      // Vérifier que tous les champs obligatoires sont renseignés
      if (!practitionerData.userId || !practitionerData.nationalIdNumber || !practitionerData.officeAddress) {
        throw new CustomError(400, "Tous les champs obligatoires doivent être renseignés");
      }

      // Créer le praticien
      const practitioner = await SqPractitioner.create({
        userId: practitionerData.userId,
        nationalIdNumber: practitionerData.nationalIdNumber,
        idCardImage: practitionerData.idCardImage,
        residenceCertificate: practitionerData.residenceCertificate,
        officeAddress: practitionerData.officeAddress,
        status: practitionerData.status || 'nouveau',
        category: practitionerData.category,
        specialty: practitionerData.specialty,
        diploma: practitionerData.diploma,
        nationalOrder: practitionerData.nationalOrder,
        registrationNumber: practitionerData.registrationNumber,
      });

      return practitioner.get({ plain: true }) as IPractitioner;
    } catch (error) {
      throw new CustomError(500, "Error creating practitioner");
    }
  }

  // Récupérer un praticien par son ID
  public async getPractitionerById(id: number): Promise<IPractitioner | null> {
    try {
      const practitioner = await SqPractitioner.findByPk(id, {
        include: [
          { model: SqUser, as: 'user' },
        ],
      });

      if (!practitioner) {
        throw new CustomError(404, 'Practitioner not found');
      }

      return practitioner.get({ plain: true }) as IPractitioner;
    } catch (error) {
      throw new CustomError(500, "Error fetching practitioner by ID");
    }
  }

  // Récupérer tous les praticiens
  public async getAllPractitioners(): Promise<IPractitioner[]> {
    try {
      const practitioners = await SqPractitioner.findAll({
        include: [
          { model: SqUser, as: 'user' },
        ],
      });

      return practitioners.map(practitioner => practitioner.get({ plain: true }) as IPractitioner);
    } catch (error) {
      throw new CustomError(500, "Error fetching all practitioners");
    }
  }

  // Mettre à jour un praticien par son ID
  public async updatePractitioner(id: number, practitionerData: IPractitioner): Promise<IPractitioner | null> {
    try {
      const practitioner = await SqPractitioner.findByPk(id);
      if (!practitioner) {
        throw new CustomError(404, 'Practitioner not found');
      }

      // Mettre à jour les informations du praticien
      await practitioner.update(practitionerData);

      return practitioner.get({ plain: true }) as IPractitioner;
    } catch (error) {
      throw new CustomError(500, "Error updating practitioner");
    }
  }

  // Supprimer un praticien par son ID
  public async deletePractitioner(id: number): Promise<boolean> {
    try {
      const practitioner = await SqPractitioner.findByPk(id);
      if (!practitioner) {
        throw new CustomError(404, 'Practitioner not found');
      }

      await practitioner.destroy();
      return true;
    } catch (error) {
      throw new CustomError(500, "Error deleting practitioner");
    }
  }

  public async countPractitioners(): Promise<number> {
    try {
      const count = await SqPractitioner.count();
      return count;
    } catch (error) {
      throw new CustomError(500, "Error counting practitioners");
    }
  }

}
