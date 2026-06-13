const { ObjectId } = require("mongodb");

const getDb = (req) => req.app.locals.db;

// Compares Collection Logic
const getCompares = async (req, res) => {
  const result = await getDb(req).collection("compares").find().toArray();
  res.send(result);
};

const addCompare = async (req, res) => {
  const CompareProductInfo = req.body;
  const result = await getDb(req).collection("compares").insertOne(CompareProductInfo);
  res.send(result);
};

const deleteCompare = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await getDb(req).collection("compares").deleteOne(query);
  res.send(result);
};

// Wishlist Collection Logic
const getWishlist = async (req, res) => {
  const result = await getDb(req).collection("wishlist").find().toArray();
  res.send(result);
};

const addWishlist = async (req, res) => {
  const WishlistProductInfo = req.body;
  console.log(WishlistProductInfo);
  const result = await getDb(req).collection("wishlist").insertOne(WishlistProductInfo);
  res.send(result);
};

const deleteWishlist = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await getDb(req).collection("wishlist").deleteOne(query);
  res.send(result);
};

// Reviews Logic
const createReview = async (req, res) => {
  const reviewData = req.body;
  const result = await getDb(req).collection("reviews").insertOne(reviewData);
  res.send(result);
};

const getReviews = async (req, res) => {
  const result = await getDb(req).collection("reviews").find().toArray();
  res.send(result);
};

module.exports = {
  getCompares,
  addCompare,
  deleteCompare,
  getWishlist,
  addWishlist,
  deleteWishlist,
  createReview,
  getReviews,
};