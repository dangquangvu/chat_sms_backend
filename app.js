var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
var logger = require("morgan");
let cors = require("cors");

var indexRouter = require("./routes/index");

var app = express();

app.use(cors());
mongoose
    .connect("mongodb://127.0.0.1:27017/musicSystem", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;