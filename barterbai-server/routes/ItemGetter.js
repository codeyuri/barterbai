var express = require("express");
var router = express.Router();

const itemGetter = require("../controllers/itemGetter");

router.post("/getitem", itemGetter.getItem);
router.delete("/cancelgetitem/:id", itemGetter.cancelGetItem);

module.exports = router;
