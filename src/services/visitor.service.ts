import { IVisitor } from "../models/visitor.model";
import SqUser, { SqVisitor } from "../sequelize-model/SqVisitor";
import { CustomError } from "../util/error";

export class VisitorService {
  // Créer un nouveau visiteur
  public async createVisitor(visitorData: IVisitor): Promise<IVisitor> {
    try {
      const visitor = await SqVisitor.create({
        userId: visitorData.userId,
        address: visitorData.address,
      });

      return visitor.get({ plain: true }) as IVisitor;
    } catch (error) {
      throw new CustomError(500, 'Erreur lors de la création du visiteur');
    }
  }

  // Récupérer tous les visiteurs
  public async getAllVisitors(): Promise<IVisitor[]> {
    try {
      const visitors = await SqVisitor.findAll({
        include: [
          { model: SqUser, as: 'user' },
        ],
      });
      return visitors.map(visitor => visitor.get({ plain: true }) as IVisitor);
    } catch (error) {
      throw new CustomError(500, 'Erreur lors de la récupération des visiteurs');
    }
  }

  // Récupérer un visiteur par son ID
  public async getVisitorById(id: number): Promise<IVisitor | null> {
    try {
      const visitor = await SqVisitor.findByPk(id, {
        include: [
          { model: SqUser, as: 'user' },
        ],
      });
      return visitor ? visitor.get({ plain: true }) as IVisitor : null;
    } catch (error) {
      throw new CustomError(500, 'Erreur lors de la récupération du visiteur');
    }
  }

  // Mettre à jour les informations d'un visiteur
  public async updateVisitor(id: number, visitorData: IVisitor): Promise<IVisitor | null> {
    try {
      const visitor = await SqVisitor.findByPk(id);
      if (!visitor) {
        throw new CustomError(404, 'Visiteur non trouvé');
      }

      await visitor.update(visitorData);

      return visitor.get({ plain: true }) as IVisitor;
    } catch (error) {
      throw new CustomError(500, 'Erreur lors de la mise à jour du visiteur');
    }
  }

  // Supprimer un visiteur par son ID
  public async deleteVisitor(id: number): Promise<boolean> {
    try {
      const visitor = await SqVisitor.findByPk(id);
      if (!visitor) {
        throw new CustomError(404, 'Visiteur non trouvé');
      }

      await visitor.destroy();
      return true;
    } catch (error) {
      throw new CustomError(500, 'Erreur lors de la suppression du visiteur');
    }
  }

  public async countVisitor():Promise<number> {
    try {
      const count = await SqVisitor.count();
      return count;
    } catch (error) {
      throw new CustomError(500, 'Erreur lors de la récupération du nombre de visiteurs');
    }
  }
}
