import express from 'express';
import {
  registerController,
  loginController,
  forgetPwdController,
  updateProfileController,
  // testCon,
} from '../controller/authController.js';

import { isLogin, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();
//routing functions
// register and the controller
router.post('/register', registerController);

//login
router.post('/login', loginController);

//forget password
router.post('/forget-password', forgetPwdController);

//update profile
router.put('/update-profile', isLogin, updateProfileController);
// router.get('/test', isLogin, isAdmin, testCon);

// is user login
router.get('/user-auth', isLogin, (req, res) => {
  res.status(200).send({ ok: true });
});

// is admin login
router.get('/admin-auth', isLogin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;
