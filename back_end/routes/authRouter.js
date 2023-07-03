import express from 'express';
import {
  registerController,
  loginController,
  testCon,
} from '../controller/authController.js';

import { isLogin, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();
//routing functions
// register and the controller
router.post('/register', registerController);

//login
router.post('/login', loginController);

router.get('/test', isLogin, isAdmin, testCon);
export default router;
