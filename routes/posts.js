const router = require("express").Router();
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
} = require("../controllers/posts");
router.route("/").get(getPosts).post(createPost);
router.route("/:id").get(getPost).delete(deletePost);

module.exports = router;
