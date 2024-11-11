import { Request, Response } from "express";
import { SqPractitioner } from "../sequelize-model/SqPractitioner";

export const updateEtatPraticien = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Cherche le praticien via l'ID de l'utilisateur
    const practitioner = await SqPractitioner.findOne({ where: { userId: id } });
    if (!practitioner) {
      return res.status(404).json({ message: "Praticien non trouvé" });
    }

    // Si le statut change, on le met à jour
    if (practitioner.status !== status) {
      practitioner.status = status;
      await practitioner.save();
    }


    res.status(200).json({ message: "Statut mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut :", error);
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour du statut",
    });
  }
};
