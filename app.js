var createError = require("http-errors");
var express = require("express");
// var http = require("http");
var path = require("path");
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
var logger = require("morgan");
let cors = require("cors");
var app = express();
// var http = require("http").Server(app);
var http = require("http");
var indexRouter = require("./routes/index");
var socketEvents = require("./controller/socket.io");
var allowedOrigins = "http://localhost:3000";
mongoose
    .connect("mongodb://127.0.0.1:27017/musicSystem", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));
var port = normalizePort(process.env.PORT || "3335");

app.set("port", port);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000"
    })
);

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
// var server = app.listen(3335);
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
var server = http.createServer(app);
var io = require("socket.io").listen(server, { origins: allowedOrigins });

server.listen(port, err => {
    if (err) {
        console.log(chalk.red("Cannot run!"));
    } else {
        // Socket event
        socketEvents(io);
        console.log("server is listening on port:", port);
    }
});
// server.listen(port, () => {
//     console.log("server is listening on port:", port);
// });

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
module.exports = app;