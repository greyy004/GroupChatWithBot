import { getUserDashboard, getUsername } from "../controllers/userController.js";
import express from 'express';
import { requireAuth } from "../middlewares/authmiddleware.js";
const router = express.Router();

router.get('/dashboard', requireAuth,  getUserDashboard);
router.get('/dashboard/username', requireAuth, getUsername);

export default router;