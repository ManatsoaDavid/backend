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
exports.afficherPraticien = void 0;
const SqPractitioner_1 = require("../sequelize-model/SqPractitioner");
const SqUser_1 = require("../sequelize-model/SqUser");
const afficherPraticien = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersWithPraticiens = yield SqUser_1.SqUser.findAll({
            include: [
                {
                    model: SqPractitioner_1.SqPractitioner, // Associe l'utilisateur avec le praticien
                    as: "practitioner",
                },
            ],
        });
        res.status(200).json(usersWithPraticiens); // Retourne les utilisateurs et leurs praticiens associés
    }
    catch (error) {
        console.error("Erreur lors de la récupération des praticiens : ", error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des praticiens" });
    }
});
exports.afficherPraticien = afficherPraticien;
