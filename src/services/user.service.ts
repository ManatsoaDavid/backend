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

  public async register(userData: IUser | IVisitor | IPractitioner): Promise<IUser | IVisitor | IPractitioner> {
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

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const baseUser = await SqUser.create({
      ...userData,
      password: hashedPassword,
      birthDate: new Date(userData.birthDate).getTime(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    let user = baseUser.get({ plain: true }) as IUser;

    if (userData.userType === 'PRATICIEN') {
      const practitioner = await this.practitionerService.createPractitioner({
        ...(userData as IPractitioner),
        userId: baseUser.userId // Passer le userId du baseUser créé
      });
      user = { ...user, ...practitioner };
    } else if (userData.userType === 'VISITEUR') {
      const visitor = await this.visitorService.createVisitor({
        ...(userData as IVisitor),
        userId: baseUser.userId // Passer le userId du baseUser créé
      });
      user = { ...user, ...visitor };
    }

    return user;
  }
  public async getUsers(): Promise<IUser[]> {
    try {
      const users = await SqUser.findAll();
      return users.map((user) => user.get({ plain: true }) as IUser);
    } catch (error) {
      throw new CustomError(500, 'Error fetching users');
    }
  }

  public async getUserById(userId: number): Promise<IUser> {
    const user = await SqUser.findByPk(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }
    return user.get({ plain: true }) as IUser;
  }

  public async updateUser(userId: number, userData: Partial<IUser>): Promise<IUser> {
    const user = await SqUser.findByPk(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }

    // Prevent modification of userType and practitionerType
    if (userData.userType && userData.userType !== user.userType) {
      throw new CustomError(400, "Le Type d'utilisateur ne peut pas être modifié");
    }

    await user.update(userData);
    return user.get({ plain: true }) as IUser;
  }


  public async deleteUser(userId: number): Promise<void> {
    const user = await SqUser.findByPk(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }

    await SqPractitioner.destroy({ where: { userId } });

    await user.destroy();
  }


  /***********************VERIFIER L EMAIL AVANT VALIDATION*************** */
  public async checkEmailExists(email: string): Promise<boolean> {
    const existingUser = await SqUser.findOne({ where: { email } });
    return !!existingUser;
  }

  /*************************VERIFIER LE NUMERO AVANT VALIDATION*/
  public async checkPhoneExists(contact: string): Promise<boolean> {
    const existingUser = await SqUser.findOne({ where: { contact } });
    return !!existingUser;
  }


  /***************************SELECTIONNER LES PRATICIENT ACCEPTER***************** */
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
      console.error('Error fetching accepted practitioners:', error);
      throw new CustomError(500, 'Error fetching accepted practitioners');
    }
  }

  /********************changer de mot de passe ******************** */
  public async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<void> {
    const user = await SqUser.scope('login').findByPk(userId);
    if (!user) {
      throw new CustomError(404, "Utilisateur non trouvé");
    }

    // Verify old password
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      throw new CustomError(400, "Ancien mot de passe incorrect");
    }

    // Hash and save new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedNewPassword });
  }


}
