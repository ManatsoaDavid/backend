import { Request, Response } from "express";
import { transporter } from "../config/emailConfig";
import { SqUser } from "../sequelize-model/SqUser";

export const envoyerEmail = async (req: Request, res: Response) => {
  try {
    const { userId, status } = req.body;

    const user = await SqUser.findByPk(userId);
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

    const info = await transporter.sendMail({
      from: 'narindrakoko@gmail.com',
      to: user.email,
      subject: sujet,
      text: contenu,
    });

    res.status(200).json({ message: "E-mail envoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail : ", error);
    res.status(500).json({ message: "Erreur serveur lors de l'envoi de l'e-mail" });
  }
};
