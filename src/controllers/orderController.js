const { ObjectId } = require("mongodb");
const { default: axios } = require("axios");

const getDb = (req) => req.app.locals.db;

const getLocations = async (req, res) => {
  const result = await getDb(req).collection("location").find().toArray();
  res.send(result);
};

const createOrder = async (req, res) => {
  const tran_id = Math.floor(10000 + Math.random() * 90000);
  const formData = req.body;
  console.log(formData);
  
  const query = {
    _id: {
      $in: formData.cartIds.map((id) => new ObjectId(id)),
    },
  };

  if (formData.paymentMethod === "cashOnDelivery") {
    const saveData = {
      ...formData,
      tran_id: tran_id,
      paymentStatus: "pending",
      orderStatus: "processing",
    };
    const deleteResult = await getDb(req).collection("carts").deleteMany(query);
    const result = await getDb(req).collection("orders").insertOne(saveData);
    return res.send({
      deleteResult,
      message: "Order placed successfully with Cash on Delivery.",
      result,
    });
  } else if (formData.paymentMethod === "bkash") {
    const saveData = {
      ...formData,
      tran_id: tran_id,
    };

    await getDb(req).collection("paymentHolder").insertOne(saveData);

    const data = {
      store_id: "digit66759e8fe463b",
      store_passwd: "digit66759e8fe463b@ssl",
      total_amount: formData.totalAmount,
      details: formData,
      currency: "BDT",
      tran_id: tran_id,
      success_url: `http://localhost:9000/orders/success-payment`,
      fail_url: "http://localhost:9000/orders/fail",
      cancel_url: "http://localhost:9000/orders/cancel",
      ipn_url: "http://localhost:5173/ipn",
      product_name: "Demo",
      product_category: "Demo",
      product_profile: "general",
      cus_name: formData.name,
      cus_email: formData.userEmail,
      cus_add1: formData.address,
      cus_phone: formData.number,
      payment_method: formData.paymentMethod,
      shipping_method: formData.shipping,
      ship_country: "Bangladesh",
      cus_name: formData?.name,
      cus_email: formData?.userEmail,
      cus_add1: formData?.address,
      cus_add2: formData?.district,
      cus_city: formData?.city,
      cus_state: formData?.division,
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: formData?.number,
      cus_fax: "01711111111",
      shipping_method: formData?.shipping,
      payment_method: formData.paymentMethod,
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_name: "Courier",
    };

    const deleteResult = await getDb(req).collection("carts").deleteMany(query);
    
    const response = await axios({
      method: "POST",
      url: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("payment url:", response.data);
    return res.send({
      deleteResult,
      paymentUrl: response.data.GatewayPageURL,
      tran_id,
    });
  } else {
    return res.status(400).send({ message: "Invalid payment method." });
  }
};

const handleSuccessPayment = async (req, res) => {
  const successData = req.body;
  console.log("SuccessData", successData);

  if (successData.status !== "VALID") {
    return res.status(401).send({ message: "Unauthorized payment" });
  }

  const sTranId = Number(successData.tran_id);

  const originalOrder = await getDb(req).collection("paymentHolder").findOne({
    tran_id: sTranId,
  });

  if (!originalOrder) {
    return res.status(404).send({ message: "Order not found." });
  }

  const saveData = {
    ...originalOrder,
    tran_id: sTranId,
    paymentStatus: "success",
    orderStatus: "Processing",
  };

  const save = await getDb(req).collection("orders").insertOne(saveData);

  if (save) {
    await getDb(req).collection("paymentHolder").deleteOne({
      tran_id: sTranId,
    });
    res.redirect(`http://localhost:5173/success/${sTranId}`);
  }
};

const getOrderByTranId = async (req, res) => {
  const tran_id = Number(req.params.tranId);

  if (!tran_id) {
    return res.status(400).send({ message: "Transaction ID is required." });
  }

  try {
    const query = { tran_id: tran_id };
    const orderDetails = await getDb(req).collection("orders").findOne(query);

    if (!orderDetails) {
      return res.status(404).send({ message: "No payment found for this transaction." });
    }

    res.send(orderDetails);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).send({ message: "Internal server error." });
  }
};

const handleFailPayment = async (req, res) => {
  res.redirect("http://localhost:5173/fail");
};

const handleCancelPayment = async (req, res) => {
  res.redirect("http://localhost:5173/cancel");
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await getDb(req).collection("orders").find().toArray();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

const getPaymentHolding = async (req, res) => {
  try {
    const orders = await getDb(req).collection("paymentHolder").find().toArray();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

const deletePaymentHolding = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await getDb(req).collection("paymentHolder").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Order deleted successfully!" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await getDb(req).collection("orders").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Order deleted successfully!" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};

module.exports = {
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
};