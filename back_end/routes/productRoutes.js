import express from 'express';
import { isAdmin, isLogin } from '../middleware/authMiddleware.js';
import formidable from 'express-formidable';
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getOneProductController,
  updateProductController,
} from '../controller/productController.js';

const router = express.Router();

router.post(
  '/create-product',
  isLogin,
  isAdmin,
  formidable(),
  createProductController
);
router.put('/update-product/:id', isLogin, isAdmin, updateProductController);
router.delete('/delete-product/:id', isLogin, isAdmin, deleteProductController);
router.get('/get-product/:id', isLogin, isAdmin, getOneProductController);
router.get('/get-all-products', isLogin, isAdmin, getAllProductsController);

export default router;
