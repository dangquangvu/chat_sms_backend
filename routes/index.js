var express = require("express");
var router = express.Router();

/* GET home page. */
router.use("/admin", require("./users.router"));
router.use("/conversation", require("./conversation.router"));
router.use("/message", require("./message.router"));
module.exports = router;