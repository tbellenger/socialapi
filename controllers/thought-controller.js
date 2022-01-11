const { Thought, User } = require("../models");

const thoughtController = {
  async addThought({ params, body }, res) {
    try {
      console.log(params);
      // find the user who created the thought
      const user = await User.findOne({
        _id: params.userId,
      });
      if (!user) {
        res.status(404).json({ message: "user not found" });
        return;
      }
      // create the thought
      const thought = await Thought.create(body).select("-__v");
      console.log(thought);
      // update the user with the thought id
      await user.update({ $push: { thoughts: thought._id } });

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getAllThought(req, res) {
    try {
      const thoughts = await Thought.find({}).select("-__v");
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async getThoughtById({ params }, res) {
    try {
      const thought = await Thought.findOne({ _id: params.id }).select("-__v");
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // add reply to comment
  async addReaction({ params, body }, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true, runValidators: true }
      ).select("-__v");
      if (!user) {
        res.status(404).json({ message: "No user found" });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
