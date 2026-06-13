const { ObjectId } = require("mongodb");

const getProductCollection = (req) => req.app.locals.db.collection("products");

const getAllProducts = async (req, res) => {
  const productCollection = getProductCollection(req);
  const result = await productCollection.find().toArray();
  res.send(result);
};

const getProductByIdAlternative = async (req, res) => {
  const productCollection = getProductCollection(req);
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await productCollection.findOne(query);
  res.send(result);
};

const getSingleProduct = async (req, res) => {
  try {
    const productCollection = getProductCollection(req);
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const product = await productCollection.findOne({ _id: objectId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createProduct = async (req, res) => {
  const productCollection = getProductCollection(req);
  const ProductData = req.body;
  const result = await productCollection.insertOne(ProductData);
  res.send(result);
};

const updateProduct = async (req, res) => {
  const productCollection = getProductCollection(req);
  const id = req.params.id;
  const updatedProduct = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: false };
  const updateDoc = {
    $set: {
      title: updatedProduct.title,
      shortDescription: updatedProduct.shortDescription,
      fullDescription: updatedProduct.fullDescription,
      images: updatedProduct.images,
      quantity: updatedProduct.quantity,
      brand: updatedProduct.brand,
      category: updatedProduct.category,
      isHot: updatedProduct.isHot,
      isNew: updatedProduct.isNew,
      discountPercentage: updatedProduct.discountPercentage,
      discountPrice: updatedProduct.discountPrice,
      price: updatedProduct.price,
      addDate: updatedProduct.addDate,
    },
  };

  try {
    const result = await productCollection.updateOne(
      filter,
      updateDoc,
      options,
    );
    res.send(result);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ message: "Failed to update product", error });
  }
};

const patchProductView = async (req, res) => {
  const productCollection = getProductCollection(req);
  const id = req.params.id;
  const { view } = req.body;
  const options = { upsert: true };
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: { view: view },
  };
  const result = await productCollection.updateOne(filter, updateDoc, options);
  res.send(result);
};

const patchProductQuantity = async (req, res) => {
  const productCollection = getProductCollection(req);
  const id = req.params.id;
  const { updatedQuantity } = req.body;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: { quantity: updatedQuantity },
  };
  const result = await productCollection.updateOne(filter, updateDoc);
  res.send(result);
};

const deleteProduct = async (req, res) => {
  const productCollection = getProductCollection(req);
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await productCollection.deleteOne(query);
  res.send(result);
};

const getProductByMainId = async (req, res) => {
  try {
    const productCollection = getProductCollection(req);
    const mainProductId = req.params.mainProductId;

    if (!ObjectId.isValid(mainProductId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await productCollection.findOne({
      _id: new ObjectId(mainProductId),
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
    console.log(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product details" });
  }
};

const getOfferProducts = async (req, res) => {
  try {
    const productCollection = getProductCollection(req);
    const { discountPercentage, limit, isHot, isNew } = req.query;

    const query = {};
    if (isHot == "false") query.isHot = "no";
    if (isNew == "false") query.isNew = "no";
    if (discountPercentage) query.discountPercentage = { $gt: 0 };

    const result = await productCollection
      .find(query)
      .limit(parseInt(limit))
      .toArray();
    res.send(result);
  } catch (err) {
    console.error("Error fetching featured products:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getFeatureProducts = async (req, res) => {
  try {
    const productCollection = getProductCollection(req);
    const { discountPercentage, limit, isHot, isNew } = req.query;

    const query = {};
    if (isHot) query.isHot = "yes";
    if (isNew == "false") query.isNew = "no";
    if (discountPercentage) query.discountPercentage = { $gt: 0 };

    const result = await productCollection
      .find(query)
      .limit(parseInt(limit))
      .toArray();
    res.send(result);
  } catch (err) {
    console.error("Error fetching featured products:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getNewProducts = async (req, res) => {
  try {
    const productCollection = getProductCollection(req);
    const { discountPercentage, limit, isHot, isNew } = req.query;

    const query = {};
    if (isHot == "false") query.isHot = "no";
    if (isNew == "false") query.isNew = "yes";
    if (discountPercentage) query.discountPercentage = 0;

    const result = await productCollection
      .find(query)
      .limit(parseInt(limit))
      .toArray();
    res.send(result);
  } catch (err) {
    console.error("Error fetching featured products:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllProducts,
  getProductByIdAlternative,
  getSingleProduct,
  createProduct,
  updateProduct,
  patchProductView,
  patchProductQuantity,
  deleteProduct,
  getProductByMainId,
  getOfferProducts,
  getFeatureProducts,
  getNewProducts,
};
