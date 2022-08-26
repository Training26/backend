const { Users } = require("../models");

// @Descr lgoin users
// @POST api/v1/users/login
exports.login = async (req, res, _next) => {
  try {
    const { email, password } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "please add an email" });
    if (!password)
      return res
        .status(400)
        .json({ success: false, message: "please add a password" });
    const user = await Users.findOne({ where: { email } });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};
