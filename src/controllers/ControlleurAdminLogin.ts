import dotenv from 'dotenv';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { SqAdmin } from "../sequelize-model/SqAdmin";

dotenv.config();

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

export const login = async (req: Request, res: Response) => {

    const { email, mdp } = req.body;

    try {
        const user = await SqAdmin.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "admin non reconnue" });
        }

        if (mdp === user.password) {

            const token = jwt.sign(
                { userId: user.adminId, email: user.email },
                secretKey,

            );

            res.status(200).json({ message: "connecter", token });
        } else {
            res.status(401).json({ message: "mot de passe incorrect" });
        }

    } catch (error) {
        console.error("erreur lors de la connexion : " + error);
        res.status(500).json({ message: "erreur serveur lors de la connexion" });
    }
}
