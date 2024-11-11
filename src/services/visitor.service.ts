import { IVisitor } from "../models/visitor.model";
import SqUser, { SqVisitor } from "../sequelize-model/SqVisitor";
import { CustomError } from "../util/error";


export class VisitorService {
  public async createVisitor(visitorData: IVisitor): Promise<IVisitor> {
    const visitor = await SqVisitor.create({
      userId: visitorData.userId,
      address: visitorData.address,
    });

    return visitor.get({ plain: true }) as IVisitor;
  }

  public async getAllVisitors(): Promise<IVisitor[]> {

    const visitors = await SqVisitor.findAll({
      include: [
        { model: SqUser, as: 'user' },
      ],
    });
    return visitors.map(visitor => visitor.get({ plain: true }) as IVisitor);
  }

  public async getVisitorById(id: number): Promise<IVisitor | null> {

    const visitor = await SqVisitor.findByPk(id, {
      include: [
        { model: SqUser, as: 'user' },
      ],
    });
    return visitor ? visitor.get({ plain: true }) as IVisitor : null;
  }

  public async updateVisitor(id: number, updateData: any): Promise<IVisitor | null> {
    const visitor = await SqVisitor.findByPk(id, {
      include: [{ model: SqUser, as: 'user' }],
    });

    if (!visitor) {
      return null;
    }

    const { user, ...visitorData } = updateData;

    await visitor.update(visitorData);
    if (user) {
      await (visitor.user as any).update(user);
    }

    await visitor.reload();
    return visitor.get({ plain: true }) as IVisitor;
  }

  public async deleteVisitor(id: number): Promise<boolean> {
    const visitor = await SqVisitor.findByPk(id);
    if (!visitor) {
      return false;
    }

    await visitor.destroy();
    return true;
  }

  public async countVisitor(): Promise<number> {
    try {
      const count = await SqVisitor.count();
      return count;
    } catch (error) {
      throw new CustomError(500, 'Erreur lors de la récupération du nombre de visiteurs');
    }
  }

}
