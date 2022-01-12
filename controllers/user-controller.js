const { User } = require("../models");

const userController = {
  async addUser({ params, body }, res) {
    try {
      console.log(params);
      const user = await User.create(body).select("-__v");
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getAllUser(req, res) {
    try {
      const users = await User.find({})
        .populate({
          path: "friends",
          select: "-__v",
        })
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .select("-__v");
      console.log(users);
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async getUserById({ params }, res) {
    try {
      const user = await User.findOne({ _id: params.id })
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v");
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // add reply to comment
  async addFriend({ params, body }, res) {
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

module.exports = userController;
