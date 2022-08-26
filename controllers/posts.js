const { Posts } = require("../models"),
  path = require("path"),
  fs = require("fs"),
  upload = require("../utils/fileUpload").upload;

// @desc    Get All Posts
// @route   GET /api/v1/posts
// @access  Public
exports.getPosts = async (_req, res, _next) => {
  try {
    const posts = await Posts.findAll({ include: ["user"] });
    if (!posts)
      return res
        .status(404)
        .json({ success: false, message: "posts not found" });
    if (posts) return res.status(200).json({ success: true, posts });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// @desc    Get Single Post
// @route   GET /api/v1/posts/id
// @access  Public
exports.getPost = async (req, res, _next) => {
  try {
    const id = req.params.id;
    const post = await Posts.findOne({ where: { id } });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "posts not found" });
    if (post) return res.status(200).json({ success: true, post });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// @desc    Create Post
// @route   POST /api/v1/posts
// @access  Private
exports.createPost = async (req, res, _next) => {
  try {
    upload(req, res, async (err) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, message: "please upload images only" });
      const { title, userId, content } = req.body;
      if (!title)
        return res
          .status(400)
          .json({ success: false, message: "please add a title" });
      if (!userId)
        return res
          .status(400)
          .json({ success: false, message: "post must have a user" });
      if (!content)
        return res
          .status(400)
          .json({ success: false, message: "please add a content" });
      if (req.files[0] === undefined)
        return res
          .status(400)
          .json({ success: false, message: "please add an image" });
      const image = req.files[0].filename;
      const post = await Posts.create({
        title,
        userId,
        image,
        content,
      });
      if (!post)
        return res
          .status(500)
          .json({ success: false, message: "unable to create post" });
      return res.status(200).json({ success: true, post });
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// @desc    Delete Post
// @route   DELETE /api/v1/posts
// @access  Private
exports.deletePost = async (req, res, _next) => {
  try {
    const id = req.params.id;
    let post = await Posts.findOne({ where: { id } });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "post not found" });
    // delete image from upload
    fs.unlinkSync(path.join(__dirname, `../public/uploads/${post.image}`));
    if (await Posts.destroy({ where: { id } }))
      return res.status(200).json({ success: true, message: `post deleted` });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};
