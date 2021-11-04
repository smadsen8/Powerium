const User = require("../models/user-model");

createUser = async (req, res) => {
  // Create a person entry
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide user information",
    });
  }
  const user = new User(body);
  if (!user) {
    return res.status(400).json({ success: false, error: err });
  }
  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: "User created",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "User not created",
      });
    });
};

getUserbyEmail = async (req, res) => {
  // Finds a single user with a given email
  await User.findOne({ email: req.params.email }, (err, user) => {
    if (err) {
      return false;
    }

    if (!user) {
      return false;
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

module.exports = { createUser, getUserbyEmail };
