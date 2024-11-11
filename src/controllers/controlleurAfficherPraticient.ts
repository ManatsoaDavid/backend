import { Request, Response } from "express";
import { SqPractitioner } from "../sequelize-model/SqPractitioner";

import { SqUser } from "../sequelize-model/SqUser";

export const afficherPraticien = async (req: Request, res: Response) => {
  try {
    const usersWithPraticiens = await SqUser.findAll({
      include: [
        {
          model: SqPractitioner, // Associe l'utilisateur avec le praticien
          as: "practitioner",

        },
      ],
    });

    res.status(200).json(usersWithPraticiens); // Retourne les utilisateurs et leurs praticiens associés
  } catch (error) {
    console.error("Erreur lors de la récupération des praticiens : ", error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des praticiens" });
  }
};
