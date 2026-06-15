const { ObjectId } = require("mongodb");

const getCartCollection = (req) => req.app.locals.db.collection("carts");

const getCartItems = async (req, res) => {
  const cartCollection = getCartCollection(req);
  const result = await cartCollection.find().toArray();
  res.send(result);
};

const addToCart = async (req, res) => {
  const cartCollection = getCartCollection(req);
  const cartProductInfo = req.body;
  const result = await cartCollection.insertOne(cartProductInfo);
  res.send(result);
};

const updateCartItem = async (req, res) => {
  const cartCollection = getCartCollection(req);
  const { id } = req.params;
  const { selectedQuantity, subtotal } = req.body;

  try {
    const result = await cartCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { selectedQuantity, subtotal } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({
      message: "Cart item updated successfully",
      data: { selectedQuantity, subtotal },
    });
  } catch (error) {
    console.error("Failed to update cart item:", error);
    res.status(500).json({ message: "Failed to update cart item", error });
  }
};

const patchCartItem = async (req, res) => {
  const cartCollection = getCartCollection(req);
  const id = req.params.id;
  const { updatedSelectedQuantity, updatedSubtotal } = req.body;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      selectedQuantity: updatedSelectedQuantity,
      subtotal: updatedSubtotal,
    },
  };
  const result = await cartCollection.updateOne(filter, updateDoc);
  res.send(result);
};

const deleteCartItem = async (req, res) => {
  const cartCollection = getCartCollection(req);
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await cartCollection.deleteOne(query);
  res.send(result);
};

module.exports = {
  getCartItems,
  addToCart,
  updateCartItem,
  patchCartItem,
  deleteCartItem,
};