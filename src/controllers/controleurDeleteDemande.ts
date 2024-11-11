import { Request, Response } from "express";
import { SqPractitioner } from "../sequelize-model/SqPractitioner";
import { SqUser } from "../sequelize-model/SqUser";
export const deleteDemande = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await SqUser.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    const praticien = await SqPractitioner.findOne({ where: { userId } });
    if (!praticien) {
      return res.status(404).json({ message: "Praticien non trouvé" });
    }
    await praticien.destroy();
    await user.destroy();
    res.status(200).json({ message: "Demande supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la demande : ", error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression de la demande" });
  }
}
