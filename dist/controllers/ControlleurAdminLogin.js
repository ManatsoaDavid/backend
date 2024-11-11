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
exports.login = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SqAdmin_1 = require("../sequelize-model/SqAdmin");
dotenv_1.default.config();
const secretKey = process.env.JWT_SECRET || 'your-secret-key';
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, mdp } = req.body;
    try {
        const user = yield SqAdmin_1.SqAdmin.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "admin non reconnue" });
        }
        if (mdp === user.password) {
            const token = jsonwebtoken_1.default.sign({ userId: user.adminId, email: user.email }, secretKey);
            res.status(200).json({ message: "connecter", token });
        }
        else {
            res.status(401).json({ message: "mot de passe incorrect" });
        }
    }
    catch (error) {
        console.error("erreur lors de la connexion : " + error);
        res.status(500).json({ message: "erreur serveur lors de la connexion" });
    }
});
exports.login = login;
