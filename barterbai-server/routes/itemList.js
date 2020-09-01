var express = require("express");
var router = express.Router();

const itemList = require("../controllers/itemList");

router
  .get("/user/:user_id", itemList.fetchItemsByUser)
  .get("/:setter_id", itemList.fetchSingleItemList)
  .get("/", itemList.fetchItems)
  .post("/user", itemList.fetchItemsByUserAndCategory)
  .post("/", itemList.fetchItemsByCategory);

module.exports = router;
