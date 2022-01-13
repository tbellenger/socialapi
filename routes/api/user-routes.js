const router = require("express").Router();
const {
  getAllUser,
  getUserById,
  addUser,
  addFriend,
  updateUser,
  deleteUser,
  deleteFriend,
} = require("../../controllers/user-controller");

// /api/user
router.route("/").get(getAllUser).post(addUser);

// /api/user/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// /api/user/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
