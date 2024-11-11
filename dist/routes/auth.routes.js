"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRoutes = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
authRoutes.post("/userLogin", authController.login.bind(authController));
exports.default = authRoutes;
