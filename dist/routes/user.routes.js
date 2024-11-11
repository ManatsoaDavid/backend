"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const user_service_1 = require("../services/user.service");
const userRoutes = express_1.default.Router();
const userService = new user_service_1.UserService();
const userController = new user_controller_1.UserController(userService);
userRoutes.get('/', (req, res) => userController.getUsers(req, res));
userRoutes.get('/accepted-practitioners', (req, res) => userController.getAcceptedPractitioners(req, res));
userRoutes.get('/:id', (req, res) => userController.getUserById(req, res));
userRoutes.post('/register', (req, res) => userController.register(req, res));
userRoutes.put('/:id', (req, res) => userController.updateUser(req, res));
userRoutes.delete('/:id', (req, res) => userController.deleteUser(req, res));
userRoutes.post('/check-email', (req, res) => userController.checkEmailExists(req, res));
userRoutes.post('/check-phone', (req, res) => userController.checkPhoneExists(req, res));
/*******************chnager de mot passe******* */
userRoutes.put('/change-password/:id', (req, res) => userController.changePassword(req, res));
exports.default = userRoutes;
