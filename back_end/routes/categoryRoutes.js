import express from 'express';
import { isAdmin, isLogin } from '../middleware/authMiddleware.js';
import {
  createCategoryController,
  updateCategoryController,
  getAllCategoryController,
  getOneCategoryController,
  deleteCategoryController,
} from '../controller/categoryController.js';

const router = express.Router();

router.post('/create-category', isLogin, isAdmin, createCategoryController);
router.delete(
  '/delete-category/:id',
  isLogin,
  isAdmin,
  deleteCategoryController
);
router.put('/update-category/:id', isLogin, isAdmin, updateCategoryController);
router.get('/get-all-category', getAllCategoryController);
router.get(
  '/get-one-category/:slug',
  isLogin,
  isAdmin,
  getOneCategoryController
);

export default router;
