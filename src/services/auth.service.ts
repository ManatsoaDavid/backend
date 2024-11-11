import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import SqPractitioner from '../sequelize-model/SqPractitioner';
import { SqUser } from '../sequelize-model/SqUser';
import { SqVisitor } from '../sequelize-model/SqVisitor';
import { UnauthorizedError, CustomError } from '../util/error';

export class AuthService {
  public async login(email: string, password: string): Promise<{ token: string; userType: string; userId: number; visitorId?: number; practitionerId?: number }> {
    try {
      // Trouver l'utilisateur par email
      const user = await SqUser.scope("login").findOne({ where: { email } });
      if (!user) {
        throw new UnauthorizedError("Email ou mot de passe incorrect");
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedError("Email ou mot de passe incorrect");
      }

      // Générer un token JWT
      const token = this.generateToken(user.get({ plain: true }) as IUser);
      const { userType, userId } = user;

      let visitorId: number | undefined;
      let practitionerId: number | undefined;

      // Récupérer les IDs de visiteur ou de praticien selon le type d'utilisateur
      if (userType === 'VISITEUR') {
        const visitor = await SqVisitor.findOne({ where: { userId } });
        visitorId = visitor?.visitorId;
      } else if (userType === 'PRATICIEN') {
        const practitioner = await SqPractitioner.findOne({ where: { userId } });
        practitionerId = practitioner?.practitionerId;
      }

      return { token, userType, userId, visitorId, practitionerId };
    } catch (error) {
      // Gérer et enregistrer l'erreur
      console.error('Error during login:', error);
      throw new CustomError(500, 'An error occurred during login');
    }
  }

  private generateToken(user: IUser): string {
    const payload = {
      userId: user.userId,
      email: user.email,
      userType: user.userType,
    };

    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
  }
}
