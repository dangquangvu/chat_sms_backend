var express = require("express");
var router = express.Router();
const AuthController = require("../controller/AuthController");
const auth = require("../middlewares/auth");
var app = express();

app.route("/friends").get(auth.authenticateToken, AuthController.getFriend);
app
    .route("/get_message")
    .post(auth.authenticateToken, AuthController.getMessage);
app.route("/send_message").post(AuthController.sendMessage);

module.exports = app;