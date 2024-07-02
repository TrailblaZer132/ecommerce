import express from "express";
import Product from '../models/productModel.js'; 
import formidable from "express-formidable";
const router = express.Router();

//controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productController.js";
import { authenticate, authorizeAdmin,authorizeSeller } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeSeller, formidable() , addProduct);
  

router.route("/allProducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeSeller, formidable(), updateProductDetails)
  .delete(authenticate, authorizeSeller, removeProduct);

router.route("/filtered-products").post(filterProducts);

router.get('/user/:userId', authenticate, async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.params.userId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

export default router;
