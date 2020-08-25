var express = require("express");
var router = express.Router();

// const auth = require("../auth");

const users = require("../controllers/users");

router.get("/", users.getAllUsers);
router.post("/login", users.loginUser);
router.post("/register", users.registerUser);
router.delete("/delete/:id", users.deleteUser);
router.put("/:id", users.updateUser);

module.exports = router;
