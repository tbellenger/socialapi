const router = require("express").Router();
const {
  getAllThought,
  getThoughtById,
  addThought,
  addReaction,
} = require("../../controllers/thought-controller");

// /api/thought
router.route("/").get(getAllThought).post(addThought);

// /api/thought/:id
router.route("/:id").get(getThoughtById);

// /api/thought/:thoughtId/reaction
router.route("/:thoughtId/reaction").post(addReaction);

module.exports = router;
