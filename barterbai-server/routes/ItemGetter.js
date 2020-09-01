var express = require("express");
var router = express.Router();

const itemGetter = require("../controllers/itemGetter");

router
  .post("/addgetter", itemGetter.addGetter)
  .delete("/cancelgetitem/:id", itemGetter.cancelGetItem);

module.exports = router;
