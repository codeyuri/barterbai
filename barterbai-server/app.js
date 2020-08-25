var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var itemSetterRouter = require("./routes/itemSetter");
var itemGetterRouter = require("./routes/itemGetter");
var category = require("./routes/category");

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/itemsetter", itemSetterRouter);
app.use("/itemgetter", itemGetterRouter);
app.use("/category", category);

module.exports = app;
