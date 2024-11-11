import express from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

const userRoutes = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

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

export default userRoutes;
