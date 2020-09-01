var express = require("express");
var router = express.Router();

// const auth = require("../auth");

const users = require("../controllers/users");

router
  .get("/", users.getAllUsers)
  .post("/login", users.loginUser)
  .post("/register", users.registerUser)
  .post("/logout", users.logoutUser)
  .delete("/delete/:id", users.deleteUser)
  .put("/:id", users.updateUser);

module.exports = router;
