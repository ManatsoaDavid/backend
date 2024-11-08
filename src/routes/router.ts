import express from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

const router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);




export default router;
