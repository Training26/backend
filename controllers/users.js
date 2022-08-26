const { Users } = require("../models"),
  bcrypt = require("bcryptjs");

// @desc    Get All users
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = async (_req, res, _next) => {
  try {
    const users = await Users.findAll();
    if (!users)
      return res
        .status(404)
        .json({ success: false, message: "users not found" });
    return res.status(200).json({ success: true, users });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// @desc    Create user
// @route   POST /api/v1/users
// @access  Public
exports.createUser = async (req, res, _next) => {
  try {
    const { name, email, password } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "please add a name" });
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "please add an email" });
    if (!password)
      return res
        .status(400)
        .json({ success: false, message: "please add a password" });
    const oldUser = await Users.findOne({ where: { email } });
    if (oldUser)
      return res.status(400).json({
        success: false,
        message: "user with this email, already exist",
      });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
    });
    if (!user)
      return res
        .status(500)
        .json({ success: false, message: "unable to create user" });
    if (user) return res.status(200).json({ success: true, user });
  } catch (err) {}
};

// @desc    Get Single user
// @route   GET /api/v1/users/id
// @access  Private
exports.getUser = async (req, res, _next) => {
  try {
    const id = req.params.id;
    const user = await Users.findOne({
      where: { id },
      include: ["posts", "messages"],
    });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// @desc    Delete Single user
// @route   GET /api/v1/users/id
// @access  Private
exports.deleteUser = async (req, res, _next) => {
  try {
    const id = req.params.id;
    const user = await Users.findOne({
      where: { id },
    });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    return res.status(200).json({ success: true, message: "user deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};
