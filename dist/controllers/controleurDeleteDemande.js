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
exports.deleteDemande = void 0;
const SqPractitioner_1 = require("../sequelize-model/SqPractitioner");
const SqUser_1 = require("../sequelize-model/SqUser");
const deleteDemande = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield SqUser_1.SqUser.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        const praticien = yield SqPractitioner_1.SqPractitioner.findOne({ where: { userId } });
        if (!praticien) {
            return res.status(404).json({ message: "Praticien non trouvé" });
        }
        yield praticien.destroy();
        yield user.destroy();
        res.status(200).json({ message: "Demande supprimée avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de la suppression de la demande : ", error);
        res.status(500).json({ message: "Erreur serveur lors de la suppression de la demande" });
    }
});
exports.deleteDemande = deleteDemande;
