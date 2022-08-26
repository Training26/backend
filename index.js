const express = require("express"),
  cors = require("cors"),
  { sequelize } = require("./models");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
  })
);
app.disable("x-powered-by");

const posts = require("./routes/posts");
const users = require("./routes/users");
const messages = require("./routes/messages");

app.use("/api/v1/posts", posts);
app.use("/api/v1/users", users);
app.use("/api/v1/messages", messages);

app.listen(PORT, async () => {
  console.log(`server running on ${PORT}`);
  await sequelize.authenticate();
  console.log("database connected ...");
});
