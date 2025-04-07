import express from "express";
import { upload } from "../../utils/cloudinary.js";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../../controllers/admin/productController.js";

const router = express.Router();

router.post("/", upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.put("/:productId", upload.single("image"), updateProduct);
router.delete("/:productId", deleteProduct);

export default router;
