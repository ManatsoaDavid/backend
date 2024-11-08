import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/userLogin", authController.login.bind(authController));

export default authRoutes;
