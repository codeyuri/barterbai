var express = require("express");
var router = express.Router();

const itemSetter = require("../controllers/itemSetter");

router.post("/additem", itemSetter.addItem);
router.delete("/deleteitem/:id", itemSetter.deleteItem);

module.exports = router;
