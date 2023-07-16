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
  productFilterController,
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
router.get('/get-all-products', getAllProductsController);
router.get('/product-photo/:id', getProductPhotoController);

router.post('/product-filters', productFilterController);

export default router;
