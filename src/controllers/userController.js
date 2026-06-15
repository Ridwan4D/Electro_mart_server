const getUserCollection = (req) => req.app.locals.db.collection("users");

const createOrUpsertUser = async (req, res) => {
  const userCollection = getUserCollection(req);
  const user = req.body;

  if (!user || !user.email) {
    return res.status(400).send({ error: "Invalid user data" });
  }

  const query = { email: user.email };
  const isExist = await userCollection.findOne(query);
  if (isExist) return res.send(isExist);

  const options = { upsert: true };
  const updateDoc = {
    $set: {
      ...user,
      Timestamp: Date.now(),
    },
  };
  const result = await userCollection.updateOne(query, updateDoc, options);
  res.send(result);
};

const updateUserByEmail = async (req, res) => {
  try {
    const userCollection = getUserCollection(req);
    const email = req.params.email;
    const userInfo = req.body;
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: { ...userInfo },
    };
    const result = await userCollection.updateOne(filter, updateDoc, options);
    res.send(result);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Error updating user information", error });
  }
};

const patchUserFields = async (req, res) => {
  const userCollection = getUserCollection(req);
  const email = req.params.email;
  const user = req.body;
  const query = { email };
  const updateDoc = {
    $set: {
      ...user,
      Timestamp: Date.now(),
    },
  };
  const result = await userCollection.updateOne(query, updateDoc);
  res.send(result);
};

const patchUserSubtotal = async (req, res) => {
  const userCollection = getUserCollection(req);
  const email = req.params.email;
  const { subtotal } = req.body;
  const filter = { email };
  const options = { upsert: true };
  const updateDoc = {
    $set: { userSubtotal: subtotal },
  };
  const result = await userCollection.updateOne(filter, updateDoc, options);
  res.send(result);
};

const getUserByEmail = async (req, res) => {
  const userCollection = getUserCollection(req);
  const email = req.params.email;
  const result = await userCollection.findOne({ email });
  res.send(result);
};

const getAllUsers = async (req, res) => {
  const userCollection = getUserCollection(req);
  const result = await userCollection.find().toArray();
  res.send(result);
};

module.exports = {
  createOrUpsertUser,
  updateUserByEmail,
  patchUserFields,
  patchUserSubtotal,
  getUserByEmail,
  getAllUsers,
};