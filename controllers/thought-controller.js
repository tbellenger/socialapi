const { Thought, User, Reaction } = require("../models");

const thoughtController = {
  async addThought({ params, body }, res) {
    try {
      console.log(params);
      // find the user who created the thought
      const user = await User.findOne({
        _id: body.userId,
      });
      if (!user) {
        res.status(404).json({ message: "user not found" });
        return;
      }
      // create the thought
      const thought = await Thought.create(body);
      console.log(thought);
      // update the user with the thought id
      await user.updateOne({ $push: { thoughts: thought._id } });

      res.json(thought);
    } catch (err) {
      console.log(err);
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
      if (thought) {
        res.json(thought);
      } else {
        res.status(404).json({ message: "Thought not found" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async updateThought({ params }, res) {
    try {
      const thought = await Thought.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      }).select("-__v");
      if (thought) {
        res.json(thought);
      } else {
        res.status(404).json({ message: "Thought not found" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async deleteThought({ params }, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: params.id });
      if (thought) {
        res.json(thought);
      } else {
        res.status(404).json({ message: "Thought not found" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // add reaction to thought
  async addReaction({ params, body }, res) {
    try {
      const reaction = await Reaction.create(body);
      console.log(reaction);
      const thought = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: reaction } },
        { new: true, runValidators: true }
      ).select("-__v");
      if (!thought) {
        res.status(404).json({ message: "No thought found" });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteReaction({ params, body }, res) {
    try {
      const reaction = await Reaction.findOne({ _id: params.reactionId });
      console.log(reaction);
      const thought = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pop: { reactions: reaction } },
        { new: true }
      ).select("-__v");
      if (!thought) {
        res.status(404).json({ message: "No thought found" });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
