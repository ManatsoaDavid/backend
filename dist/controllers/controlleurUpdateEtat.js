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
exports.updateEtatPraticien = void 0;
const SqPractitioner_1 = require("../sequelize-model/SqPractitioner");
const updateEtatPraticien = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        // Cherche le praticien via l'ID de l'utilisateur
        const practitioner = yield SqPractitioner_1.SqPractitioner.findOne({ where: { userId: id } });
        if (!practitioner) {
            return res.status(404).json({ message: "Praticien non trouvé" });
        }
        // Si le statut change, on le met à jour
        if (practitioner.status !== status) {
            practitioner.status = status;
            yield practitioner.save();
        }
        res.status(200).json({ message: "Statut mis à jour avec succès" });
    }
    catch (error) {
        console.error("Erreur lors de la mise à jour du statut :", error);
        res.status(500).json({
            message: "Erreur serveur lors de la mise à jour du statut",
        });
    }
});
exports.updateEtatPraticien = updateEtatPraticien;
