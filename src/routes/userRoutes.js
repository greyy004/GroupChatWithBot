import { getUserDashboard } from "../controllers/userController.js";
import express from 'express';
import { requireAuth } from "../middlewares/authmiddleware.js";
const router = express.Router();

router.get('/dashboard',requireAuth,  getUserDashboard);

export default router;