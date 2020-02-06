var express = require("express");
var router = express.Router();
const AuthController = require("../controller/AuthController");
const auth = require("../middlewares/auth");
var app = express();
/* GET users listing. */
app.route("/init").get(AuthController.init);
app.route("/signIn").post(AuthController.signIn);
app
    .route("/")
    .get(auth.authenticateToken, AuthController.getLogin)
    .post(AuthController.postLogin);
app.route("/test").get(AuthController.test);
app.route("/verifyToken").post(AuthController.verifyToken);
app.route("/friends").get(auth.authenticateToken, AuthController.getFriend);
app.route("/get_message").post(AuthController.getMessage);
app.route("/send_message").post(AuthController.sendMessage);
app.route("/conversation").post(AuthController.setConversation);
app.route("/conversationId").post(AuthController.getConversationId);
module.exports = app;