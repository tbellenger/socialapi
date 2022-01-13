const router = require("express").Router();
const {
  getAllThought,
  getThoughtById,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// /api/thought
router.route("/").get(getAllThought).post(addThought);

// /api/thought/:id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thought/:thoughtId/reaction
router.route("/:thoughtId/reaction").post(addReaction);

// /api/thought/:thoughtId/reaction/:reactionId
router.route("/:thoughtId/reaction/:reactionId").delete(deleteReaction);

module.exports = router;
