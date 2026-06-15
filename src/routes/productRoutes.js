const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductByIdAlternative,
  getSingleProduct,
  createProduct,
  updateProduct,
  patchProductView,
  patchProductQuantity,
  deleteProduct,
  getProductByMainId,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:id", getProductByIdAlternative);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/main/:mainProductId", getProductByMainId);

module.exports = router;