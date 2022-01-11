const { User } = require("../models");

const UserController = {
  async addUser({ params, body }, res) {
    try {
      console.log(params);
      const user = await User.create(body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getAllUser(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async getUserById({ params }, res) {
    try {
      const user = User.findOne({ _id: params.id });
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
