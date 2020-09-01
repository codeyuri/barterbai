var express = require("express");
var router = express.Router();

const category = require("../controllers/category");

router
  .get("/", category.getCategories)
  .post("/add", category.addCategory)
  .delete("/delete/:id", category.deleteCategory);

module.exports = router;
