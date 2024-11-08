import bcrypt from 'bcrypt';
import { IPractitioner } from "../models/practitioner.model";
import { IUser, User } from "../models/user.model";
import { IVisitor } from "../models/visitor.model";
import SqPractitioner from '../sequelize-model/SqPractitioner';
import { SqUser } from "../sequelize-model/SqUser";
import { CustomError } from "../util/error";
import { PractitionerService } from "./practitioner.service";
import { VisitorService } from "./visitor.service";

export class UserService {
  private practitionerService: PractitionerService;
  private visitorService: VisitorService;

  constructor() {
    this.practitionerService = new PractitionerService();
    this.visitorService = new VisitorService();
  }

  // Enregistrer un nouvel utilisateur (praticien ou visiteur)
  public async register(userData: IUser | IVisitor | IPractitioner): Promise<IUser | IVisitor | IPractitioner> {
    try {
      const { email, contact } = userData;

      // Vérifier si l'email existe déjà
      const existingUserByEmail = await SqUser.findOne({ where: { email } });
      if (existingUserByEmail) {
        throw new CustomError(400, "L'email est déjà utilisé.");
      }

      // Vérifier si le contact existe déjà
      const existingUserByContact = await SqUser.findOne({ where: { contact } });
      if (existingUserByContact) {
        throw new CustomError(400, "Le contact est déjà utilisé.");
      }

      // Hash du mot de passe avant enregistrement dans la base de données
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Créer l'utilisateur de base
      const baseUser = await SqUser.create({
        ...userData,
        password: hashedPassword,
        birthDate: new Date(userData.birthDate).getTime(),
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      let user = baseUser.get({ plain: true }) as IUser;

      // Si l'utilisateur est un praticien, enregistrer ses informations de praticien
      if (userData.userType === 'PRATICIEN') {
        const practitioner = await this.practitionerService.createPractitioner({
          ...(userData as IPractitioner),
          userId: baseUser.userId // Passer le userId du baseUser créé
        });
        user = { ...user, ...practitioner };
      }
      // Si l'utilisateur est un visiteur, enregistrer ses informations de visiteur
      else if (userData.userType === 'VISITEUR') {
        const visitor = await this.visitorService.createVisitor({
          ...(userData as IVisitor),
          userId: baseUser.userId // Passer le userId du baseUser créé
        });
        user = { ...user, ...visitor };
      }

      return user;
    } catch (error) {
      throw new CustomError(500, 'Error during user registration');
    }
  }

  // Récupérer tous les utilisateurs
  public async getUsers(): Promise<IUser[]> {
    try {
      const users = await SqUser.findAll();
      return users.map((user) => user.get({ plain: true }) as IUser);
    } catch (error) {
      throw new CustomError(500, 'Error fetching users');
    }
  }

  // Récupérer un utilisateur par son ID
  public async getUserById(userId: number): Promise<IUser> {
    try {
      const user = await SqUser.findByPk(userId);
      if (!user) {
        throw new CustomError(404, "User not found");
      }
      return user.get({ plain: true }) as IUser;
    } catch (error) {
      throw new CustomError(500, 'Error fetching user by ID');
    }
  }

  // Mettre à jour un utilisateur par son ID
  public async updateUser(userId: number, userData: Partial<IUser>): Promise<IUser> {
    try {
      const user = await SqUser.findByPk(userId);
      if (!user) {
        throw new CustomError(404, "User not found");
      }

      // Empêcher la modification du type d'utilisateur
      if (userData.userType && userData.userType !== user.userType) {
        throw new CustomError(400, "Le type d'utilisateur ne peut pas être modifié");
      }

      await user.update(userData);
      return user.get({ plain: true }) as IUser;
    } catch (error) {
      throw new CustomError(500, 'Error updating user');
    }
  }

  // Supprimer un utilisateur par son ID
  public async deleteUser(userId: number): Promise<void> {
    try {
      const user = await SqUser.findByPk(userId);
      if (!user) {
        throw new CustomError(404, "User not found");
      }

      // Supprimer les données du praticien liées à l'utilisateur
      await SqPractitioner.destroy({ where: { userId } });

      await user.destroy();
    } catch (error) {
      throw new CustomError(500, 'Error deleting user');
    }
  }

  // Vérifier si un email existe déjà dans la base de données
  public async checkEmailExists(email: string): Promise<boolean> {
    try {
      const existingUser = await SqUser.findOne({ where: { email } });
      return !!existingUser;
    } catch (error) {
      throw new CustomError(500, 'Error checking email existence');
    }
  }

  // Vérifier si un numéro de téléphone existe déjà dans la base de données
  public async checkPhoneExists(contact: string): Promise<boolean> {
    try {
      const existingUser = await SqUser.findOne({ where: { contact } });
      return !!existingUser;
    } catch (error) {
      throw new CustomError(500, 'Error checking phone number existence');
    }
  }

  // Récupérer les praticiens ayant le statut 'accepter'
  public async getAcceptedPractitioners(): Promise<User[]> {
    try {
      const acceptedPractitioners = await SqUser.findAll({
        include: [{
          model: SqPractitioner,
          as: 'practitioner',
          where: { status: 'accepter' },
        }],
        where: { userType: 'PRATICIEN' }
      });

      return acceptedPractitioners.map((user) => user.get({ plain: true }) as User);
    } catch (error) {
      throw new CustomError(500, 'Error fetching accepted practitioners');
    }
  }

  public async countUsers(): Promise<number> {
    try {
      const count = await SqUser.count();
      return count;
    } catch (error) {
      throw new CustomError(500, 'Error counting users');
    }
  }


}
