import { IPractitioner } from "../models/practitioner.model";
import { SqPractitioner } from "../sequelize-model/SqPractitioner";
import SqUser from '../sequelize-model/SqUser';
import { CustomError } from "../util/error";


export class PractitionerService {
  public async createPractitioner(practitionerData: IPractitioner): Promise<IPractitioner> {
    if (!practitionerData.userId || !practitionerData.officeAddress) {
      throw new Error("Tous les champs obligatoires doivent être renseignés");

    }

    const practitioner = await SqPractitioner.create({
      userId: practitionerData.userId,
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
  }


  public async getPractitionerById(id: number): Promise<IPractitioner | null> {
    const practitioner = await SqPractitioner.findByPk(id, {
      include: [
        { model: SqUser, as: 'user' },
      ],
    });

    if (!practitioner) {
      return null;
    }

    return practitioner.get({ plain: true }) as IPractitioner;
  }

  public async getAllPractitioners(): Promise<IPractitioner[]> {

    const practitioners = await SqPractitioner.findAll({
      include: [
        { model: SqUser, as: 'user' },
      ],
    });

    return practitioners.map(practitioner => practitioner.get({ plain: true }) as IPractitioner);
  }




  public async updatePractitioner(id: number, updateData: any): Promise<IPractitioner | null> {
    const practitioner = await SqPractitioner.findByPk(id, {
      include: [
        { model: SqUser, as: 'user' }],
    });
    if (!practitioner) {
      return null;
    }
    const { user, ...practitionerData } = updateData;

    await practitioner.update(practitionerData);
    if (user) {
      await (practitioner.user as any).update(user);
    }

    await practitioner.reload();
    return practitioner.get({ plain: true }) as IPractitioner;
  }


  public async deletePractitioner(id: number): Promise<boolean> {
    const practitioner = await SqPractitioner.findByPk(id);
    if (!practitioner) {
      return false;
    }

    await practitioner.destroy();
    return true;
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
