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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SqPractitioner_1 = __importDefault(require("../sequelize-model/SqPractitioner"));
const SqUser_1 = require("../sequelize-model/SqUser");
const SqVisitor_1 = require("../sequelize-model/SqVisitor");
const error_1 = require("../util/error");
class AuthService {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Trouver l'utilisateur par email
                const user = yield SqUser_1.SqUser.scope("login").findOne({ where: { email } });
                if (!user) {
                    throw new error_1.UnauthorizedError("Email ou mot de passe incorrect");
                }
                // Vérifier le mot de passe
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new error_1.UnauthorizedError("Email ou mot de passe incorrect");
                }
                // Générer un token JWT
                const token = this.generateToken(user.get({ plain: true }));
                const { userType, userId } = user;
                let visitorId;
                let practitionerId;
                // Récupérer les IDs de visiteur ou de praticien selon le type d'utilisateur
                if (userType === 'VISITEUR') {
                    const visitor = yield SqVisitor_1.SqVisitor.findOne({ where: { userId } });
                    visitorId = visitor === null || visitor === void 0 ? void 0 : visitor.visitorId;
                }
                else if (userType === 'PRATICIEN') {
                    const practitioner = yield SqPractitioner_1.default.findOne({ where: { userId } });
                    practitionerId = practitioner === null || practitioner === void 0 ? void 0 : practitioner.practitionerId;
                }
                return { token, userType, userId, visitorId, practitionerId };
            }
            catch (error) {
                // Gérer et enregistrer l'erreur
                console.error('Error during login:', error);
                throw new error_1.CustomError(500, 'An error occurred during login');
            }
        });
    }
    generateToken(user) {
        const payload = {
            userId: user.userId,
            email: user.email,
            userType: user.userType,
        };
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    }
}
exports.AuthService = AuthService;
