var express = require("express");
var router = express.Router();

const category = require("../controllers/category");

router.post("/add", category.addCategory);
router.delete("/delete/:id", category.deleteCategory);

module.exports = router;
