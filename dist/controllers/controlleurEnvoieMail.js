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
Object.defineProperty(exports, "__esModule", { value: true });
exports.envoyerEmail = void 0;
const emailConfig_1 = require("../config/emailConfig");
const SqUser_1 = require("../sequelize-model/SqUser");
const envoyerEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, status } = req.body;
        const user = yield SqUser_1.SqUser.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        let sujet, contenu;
        switch (status) {
            case "accepter":
                sujet = "Votre candidature a été acceptée";
                contenu = "Félicitations ! Votre candidature a été acceptée.";
                break;
            case "refuser":
                sujet = "Votre candidature a été refusée";
                contenu = "Nous sommes désolés, votre candidature n'a pas été retenue.";
                break;
            case "attente":
                sujet = "Votre candidature est en attente";
                contenu = "Votre candidature est actuellement en cours d'examen. Nous vous tiendrons informé de son évolution.";
                break;
            default:
                return res.status(400).json({ message: "État de candidature non valide" });
        }
        const info = yield emailConfig_1.transporter.sendMail({
            from: 'narindrakoko@gmail.com',
            to: user.email,
            subject: sujet,
            text: contenu,
        });
        res.status(200).json({ message: "E-mail envoyé avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail : ", error);
        res.status(500).json({ message: "Erreur serveur lors de l'envoi de l'e-mail" });
    }
});
exports.envoyerEmail = envoyerEmail;
