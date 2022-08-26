const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
} = require("../controllers/users");
router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).delete(deleteUser);

module.exports = router;
