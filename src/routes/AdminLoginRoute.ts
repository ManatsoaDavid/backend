import express from 'express';
import { login } from '../controllers/ControlleurAdminLogin';
const router = express.Router();

router.post('/', login);
export default router;