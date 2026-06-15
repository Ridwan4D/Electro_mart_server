const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
  deleteCategory,
  getStores,
  createStore,
  updateStore,
  deleteStore,
  getPromotions,
  createPromotion,
  deletePromotion,
  getBanners,
  getRightTop,
  getRightBottomL,
  getRightBottomR,
  createBanner,
  createRightTop,
  createRightBottomL,
  createRightBottomR,
  deleteBanner,
  deleteRightTop,
  deleteRightBottomL,
  deleteRightBottomR,
} = require("../controllers/marketingController");

// Categories
router.get("/categories", getCategories);
router.post("/categories", createCategory);
router.delete("/categories/:id", deleteCategory);

// Stores
router.get("/stores", getStores);
router.post("/stores", createStore);
router.put("/stores/:id", updateStore);
router.delete("/stores/:id", deleteStore);

// Promotions
router.get("/promotions", getPromotions);
router.post("/promotions", createPromotion);
router.delete("/promotions/:id", deletePromotion);

// Sliders / Banners
router.get("/banners", getBanners);
router.post("/banners", createBanner);
router.delete("/banners/:id", deleteBanner);

router.get("/rightTop", getRightTop);
router.post("/rightTop", createRightTop);
router.delete("/rightTop/:id", deleteRightTop);

router.get("/rightBottomL", getRightBottomL);
router.post("/rightBottomL", createRightBottomL);
router.delete("/rightBottomL/:id", deleteRightBottomL);

router.get("/rightBottomR", getRightBottomR);
router.post("/rightBottomR", createRightBottomR);
router.delete("/rightBottomR/:id", deleteRightBottomR);

module.exports = router;