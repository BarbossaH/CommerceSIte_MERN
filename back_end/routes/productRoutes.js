import express from 'express';
import { isAdmin, isLogin } from '../middleware/authMiddleware.js';
import formidable from 'express-formidable';
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getOneProductController,
  updateProductController,
  getProductPhotoController,
} from '../controller/productController.js';

const router = express.Router();

router.post(
  '/create-product',
  isLogin,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  '/update-product/:id',
  isLogin,
  isAdmin,
  formidable(),
  updateProductController
);
router.delete('/delete-product/:id', isLogin, isAdmin, deleteProductController);
router.get('/get-product/:slug', isLogin, isAdmin, getOneProductController);
router.get('/get-all-products', isLogin, isAdmin, getAllProductsController);
router.get('/product-photo/:id', getProductPhotoController);

export default router;
