var express = require("express");
var router = express.Router();

const itemTransactions = require("../controllers/itemTransactions");

router.get("/:user_id", itemTransactions.fetchTransactions);

module.exports = router;
