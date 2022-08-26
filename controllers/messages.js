const { Messages } = require("../models");

// @desc    Get All messages
// @route   GET /api/v1/messages
// @access  Public
exports.getMessages = async (_req, res, _next) => {
  try {
    const messages = await Messages.findAll({
      include: ["user"],
    });
    if (!messages)
      return res
        .status(404)
        .json({ success: false, message: "messages not found" });
    return res.status(200).json({ success: true, messages });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// @desc    Get Single message
// @route   GET /api/v1/messages/id
// @access  Public
exports.getMessage = async (req, res, _next) => {
  try {
    const id = req.params.id;
    const message = await Messages.findOne({
      where: { id },
      include: ["user"],
    });
    if (!message)
      return res
        .status(404)
        .json({ success: false, message: "message not found" });
    return res.status(200).json({ success: true, message });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// @desc    Create message
// @route   POST /api/v1/messages
// @access  Public
exports.createMessage = async (req, res, _next) => {
  try {
    const { userId, message } = req.body;
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "please add a user" });
    if (!message)
      return res
        .status(404)
        .json({ success: false, message: "please add a message" });
    const userMessage = await Messages.create({ userId, message });
    if (!userMessage)
      return res
        .status(500)
        .json({ success: false, message: "unable to create message" });
    return res.status(200).json({ success: true, userMessage });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// @desc    Delete message
// @route   DELETE /api/v1/messages/id
// @access  Private
exports.deleteMessage = async (req, res, _next) => {
  try {
    const id = req.params.id;
    const message = await Messages.findOne({
      where: { id },
    });
    if (!message)
      return res
        .status(404)
        .json({ success: false, message: "message not found" });
    return res.status(200).json({ success: true, message: "message deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};
