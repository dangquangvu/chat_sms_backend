var express = require("express");
var router = express.Router();
const AuthController = require("../controller/AuthController");
const auth = require("../middlewares/auth");
/* GET users listing. */
router
    .get("/init", AuthController.init)
    .post("/init", AuthController.generateUser);
router
    .get("/", auth.authenticateToken, AuthController.getLogin)
    .post("/", AuthController.postLogin);

module.exports = router;