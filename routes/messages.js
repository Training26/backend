const router = require("express").Router();
const {
  getMessages,
  getMessage,
  createMessage,
  deleteMessage,
} = require("../controllers/messages");

router.route("/").get(getMessages).post(createMessage);
router.route("/:id").get(getMessage).delete(deleteMessage);

module.exports = router;
