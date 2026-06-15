const express = require("express");
const router = express.Router();
const {
  getCartItems,
  addToCart,
  updateCartItem,
  patchCartItem,
  deleteCartItem,
} = require("../controllers/cartController");

router.get("/", getCartItems);
router.post("/", addToCart);
router.put("/:id", updateCartItem);
router.patch("/:id", patchCartItem);
router.delete("/:id", deleteCartItem);

module.exports = router;