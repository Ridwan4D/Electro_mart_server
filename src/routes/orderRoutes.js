const express = require("express");
const router = express.Router();
const {
  getLocations,
  createOrder,
  handleSuccessPayment,
  getOrderByTranId,
  handleFailPayment,
  handleCancelPayment,
  getAllOrders,
  getPaymentHolding,
  deletePaymentHolding,
  deleteOrder,
} = require("../controllers/orderController");

router.get("/locations", getLocations);
router.post("/order", createOrder);
router.post("/success-payment", handleSuccessPayment);
router.get("/orders/:tranId", getOrderByTranId);
router.post("/fail", handleFailPayment);
router.post("/cancel", handleCancelPayment);
router.get("/orders", getAllOrders);
router.get("/paymentHolding", getPaymentHolding);
router.delete("/paymentHolding/:id", deletePaymentHolding);
router.delete("/orders/:id", deleteOrder);

module.exports = router;