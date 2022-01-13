const { User, Thought } = require("../models");

const userController = {
  async addUser(req, res) {
    try {
      const user = await User.create(req.body);
      if (user) {
        res.json(user);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
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

  async updateUser({ params, body }, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: params.id }, body, {
        runValidators: true,
        new: true,
      });
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteUser({ params, body }, res) {
    try {
      const user = await User.findOneAndDelete({ _id: params.id }).select(
        "-__v"
      );
      if (user) {
        const thoughts = await Thought.deleteMany({ username: user.username });
        user.deletedThoughts = thoughts.deletedCount;
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // add friend to user
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

  async deleteFriend({ params, body }, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pop: { friends: params.friendId } },
        { new: true }
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
