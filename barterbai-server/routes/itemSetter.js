var express = require("express");
var router = express.Router();

const itemSetter = require("../controllers/itemSetter");

router
  .post("/additem", itemSetter.addItem)
  .delete("/deleteitem/:id", itemSetter.deleteItem)
  .put("/status", itemSetter.updateViewStatus);

module.exports = router;
