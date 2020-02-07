var express = require("express");
var router = express.Router();
const AuthController = require("../controller/AuthController");
const auth = require("../middlewares/auth");
var app = express();

app
    .route("/conversation")
    .post(auth.authenticateToken, AuthController.setConversation);
app
    .route("/conversationId")
    .post(auth.authenticateToken, AuthController.getConversationId);
module.exports = app;