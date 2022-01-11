const router = require("express").Router();
const {
  getAllUser,
  getUserById,
  addUser,
  addFriend,
} = require("../../controllers/user-controller");

// /api/user
router.route("/").get(getAllUser).post(addUser);

// /api/user/:id
router.route("/:id").get(getUserById);

// /api/user/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend);

module.exports = router;
