const express = require("express");
const router = express.Router();
const {
  createOrUpsertUser,
  updateUserByEmail,
  patchUserFields,
  patchUserSubtotal,
  getUserByEmail,
  getAllUsers,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.put("/", createOrUpsertUser);
router.put("/:email", updateUserByEmail);
router.get("/:email", getUserByEmail);
router.patch("/update/:email", patchUserFields);
router.patch("/:email", patchUserSubtotal);

module.exports = router;