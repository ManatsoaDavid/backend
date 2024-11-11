"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const SqPractitioner_1 = __importDefault(require("../sequelize-model/SqPractitioner"));
const SqUser_1 = require("../sequelize-model/SqUser");
const error_1 = require("../util/error");
const practitioner_service_1 = require("./practitioner.service");
const visitor_service_1 = require("./visitor.service");
class UserService {
    constructor() {
        this.practitionerService = new practitioner_service_1.PractitionerService();
        this.visitorService = new visitor_service_1.VisitorService();
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, contact } = userData;
            // Vérifier si l'email existe déjà
            const existingUserByEmail = yield SqUser_1.SqUser.findOne({ where: { email } });
            if (existingUserByEmail) {
                throw new error_1.CustomError(400, "L'email est déjà utilisé.");
            }
            // Vérifier si le contact existe déjà
            const existingUserByContact = yield SqUser_1.SqUser.findOne({ where: { contact } });
            if (existingUserByContact) {
                throw new error_1.CustomError(400, "Le contact est déjà utilisé.");
            }
            // Hash the password before storing it in the database
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
            const baseUser = yield SqUser_1.SqUser.create(Object.assign(Object.assign({}, userData), { password: hashedPassword, birthDate: new Date(userData.birthDate).getTime(), createdAt: Date.now(), updatedAt: Date.now() }));
            let user = baseUser.get({ plain: true });
            if (userData.userType === 'PRATICIEN') {
                const practitioner = yield this.practitionerService.createPractitioner(Object.assign(Object.assign({}, userData), { userId: baseUser.userId // Passer le userId du baseUser créé
                 }));
                user = Object.assign(Object.assign({}, user), practitioner);
            }
            else if (userData.userType === 'VISITEUR') {
                const visitor = yield this.visitorService.createVisitor(Object.assign(Object.assign({}, userData), { userId: baseUser.userId // Passer le userId du baseUser créé
                 }));
                user = Object.assign(Object.assign({}, user), visitor);
            }
            return user;
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield SqUser_1.SqUser.findAll();
                return users.map((user) => user.get({ plain: true }));
            }
            catch (error) {
                throw new error_1.CustomError(500, 'Error fetching users');
            }
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield SqUser_1.SqUser.findByPk(userId);
            if (!user) {
                throw new error_1.CustomError(404, "User not found");
            }
            return user.get({ plain: true });
        });
    }
    updateUser(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield SqUser_1.SqUser.findByPk(userId);
            if (!user) {
                throw new error_1.CustomError(404, "User not found");
            }
            // Prevent modification of userType and practitionerType
            if (userData.userType && userData.userType !== user.userType) {
                throw new error_1.CustomError(400, "Le Type d'utilisateur ne peut pas être modifié");
            }
            yield user.update(userData);
            return user.get({ plain: true });
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield SqUser_1.SqUser.findByPk(userId);
            if (!user) {
                throw new error_1.CustomError(404, "User not found");
            }
            yield SqPractitioner_1.default.destroy({ where: { userId } });
            yield user.destroy();
        });
    }
    /***********************VERIFIER L EMAIL AVANT VALIDATION*************** */
    checkEmailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield SqUser_1.SqUser.findOne({ where: { email } });
            return !!existingUser;
        });
    }
    /*************************VERIFIER LE NUMERO AVANT VALIDATION*/
    checkPhoneExists(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield SqUser_1.SqUser.findOne({ where: { contact } });
            return !!existingUser;
        });
    }
    /***************************SELECTIONNER LES PRATICIENT ACCEPTER***************** */
    getAcceptedPractitioners() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const acceptedPractitioners = yield SqUser_1.SqUser.findAll({
                    include: [{
                            model: SqPractitioner_1.default,
                            as: 'practitioner',
                            where: { status: 'accepter' },
                        }],
                    where: { userType: 'PRATICIEN' }
                });
                return acceptedPractitioners.map((user) => user.get({ plain: true }));
            }
            catch (error) {
                console.error('Error fetching accepted practitioners:', error);
                throw new error_1.CustomError(500, 'Error fetching accepted practitioners');
            }
        });
    }
    /********************changer de mot de passe ******************** */
    changePassword(userId, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield SqUser_1.SqUser.scope('login').findByPk(userId);
            if (!user) {
                throw new error_1.CustomError(404, "Utilisateur non trouvé");
            }
            // Verify old password
            const isValidPassword = yield bcrypt_1.default.compare(oldPassword, user.password);
            if (!isValidPassword) {
                throw new error_1.CustomError(400, "Ancien mot de passe incorrect");
            }
            // Hash and save new password
            const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 10);
            yield user.update({ password: hashedNewPassword });
        });
    }
}
exports.UserService = UserService;
