import express from 'express';
import { authRegister, authLogin } from '../middlewares/authmiddleware.js';
import { userRegister, userLogin} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', authRegister, userRegister);

router.post('/login', authLogin, userLogin);

export default router;