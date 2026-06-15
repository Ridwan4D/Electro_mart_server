const { ObjectId } = require("mongodb");

const getDb = (req) => req.app.locals.db;

// Categories
const getCategories = async (req, res) => {
  const result = await getDb(req).collection("categories").find().toArray();
  res.send(result);
};

const createCategory = async (req, res) => {
  const updateFormInfo = req.body;
  const result = await getDb(req).collection("categories").insertOne(updateFormInfo);
  res.send(result);
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await getDb(req).collection("categories").deleteOne(query);
  res.send(result);
};

// Stores
const getStores = async (req, res) => {
  const result = await getDb(req).collection("stores").find().toArray();
  res.send(result);
};

const createStore = async (req, res) => {
  const storeInfo = req.body;
  const result = await getDb(req).collection("stores").insertOne(storeInfo);
  res.send(result);
};

const updateStore = async (req, res) => {
  const id = req.params.id;
  const storeInfo = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: false };
  const updateDoc = {
    $set: {
      shopName: storeInfo.shopName,
      shopAddress: storeInfo.shopAddress,
      shopContactNumber: storeInfo.shopContactNumber,
      shortDescription: storeInfo.shortDescription,
      operatingHours: storeInfo.operatingHours,
      image: storeInfo.image,
    },
  };
  const result = await getDb(req).collection("stores").updateOne(filter, updateDoc, options);
  res.send(result);
};

const deleteStore = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await getDb(req).collection("stores").deleteOne(query);
  res.send(result);
};

// Promotions
const getPromotions = async (req, res) => {
  const result = await getDb(req).collection("promotions").find().toArray();
  res.send(result);
};

const createPromotion = async (req, res) => {
  const promotionProductInfo = req.body;
  const result = await getDb(req).collection("promotions").insertOne(promotionProductInfo);
  res.send(result);
};

const deletePromotion = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await getDb(req).collection("promotions").deleteOne(query);
  res.send(result);
};

// Sliders / Banners
const getBanners = async (req, res) => {
  const result = await getDb(req).collection("sliders").find().toArray();
  res.send(result);
};

const getRightTop = async (req, res) => {
  const result = await getDb(req).collection("rightTopSliders").find().toArray();
  res.send(result);
};

const getRightBottomL = async (req, res) => {
  const result = await getDb(req).collection("rightBottomLSliders").find().toArray();
  res.send(result);
};

const getRightBottomR = async (req, res) => {
  const result = await getDb(req).collection("rightBottomRSliders").find().toArray();
  res.send(result);
};

const createBanner = async (req, res) => {
  const bannerInfo = req.body;
  const result = await getDb(req).collection("sliders").insertOne(bannerInfo);
  res.send(result);
};

const createRightTop = async (req, res) => {
  const bannerInfo = req.body;
  const result = await getDb(req).collection("rightTopSliders").insertOne(bannerInfo);
  res.send(result);
};

const createRightBottomL = async (req, res) => {
  const bannerInfo = req.body;
  const result = await getDb(req).collection("rightBottomLSliders").insertOne(bannerInfo);
  res.send(result);
};

const createRightBottomR = async (req, res) => {
  const bannerInfo = req.body;
  const result = await getDb(req).collection("rightBottomRSliders").insertOne(bannerInfo);
  res.send(result);
};

const deleteBanner = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await getDb(req).collection("sliders").deleteOne(query);
  res.send(result);
};

const deleteRightTop = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await getDb(req).collection("rightTopSliders").deleteOne(query);
  res.send(result);
};

const deleteRightBottomL = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await getDb(req).collection("rightBottomLSliders").deleteOne(query);
  res.send(result);
};

const deleteRightBottomR = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await getDb(req).collection("rightBottomRSliders").deleteOne(query);
  res.send(result);
};

module.exports = {
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
};