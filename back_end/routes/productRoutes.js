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
  searchProductsController,
  getSimilarProductsController,
  getProductsBasedOnCategoryController,
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
router.get('/get-product/:slug', getOneProductController);
router.get('/get-similar-products/:pid/:cid', getSimilarProductsController);
router.get('/get-all-products', getAllProductsController);
router.get('/product-photo/:id', getProductPhotoController);

router.post('/product-filters/:page', productFilterController);
router.get('/search/:keyword', searchProductsController);

router.get(
  '/get-category-products/:slug',
  getProductsBasedOnCategoryController
);
// router.get('/get-products-total', getTotalCountController);
// router.get('/get-page-products/:page', getPageProductController);

export default router;
