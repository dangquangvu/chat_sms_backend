const { User } = require("../schema/index");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

const arrUser = [{
        fullname: "dang quang vu",
        email: "dangquangvu999@gmail.com",
        password: "admin"
    },
    {
        fullname: "dang tuan phat",
        email: "dangvu9981@gmail.com",
        password: "admin"
    }
];
module.exports = {
    getLogin: (req, res) => {
        console.log(req.user);

        res.jsonp(arrUser.filter(user => user.email === req.user.email));
    },
    postLogin: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const user = { email: email, password: password };
        console.log(user);
        let accessToken = auth.generateAccessToken(user);
        let refreshToken = jwt.sign(user, process.env.Refresh_token);
        res
            .status(200)
            .jsonp({ accessToken: accessToken, refreshToken: refreshToken });
    },
    init: async(req, res, next) => {
        let fullname = "admin";
        let email = "admin@gmail.com";
        let password = "admin123";
        let userInit = {
            fullname: fullname,
            password: password,
            email: email
        };
        try {
            let admin = await User.findOne({ email: "admin@gmail.com" });
            if (!admin) {
                let user = new User(userInit);
                await user.save();
            }
            return res.status(200).json({
                message: "create user ok!"
            });
        } catch (err) {
            return res.status(404).json({
                message: "create user error!"
            });
        }
    },
    generateUser: async(req, res, next) => {
        let userReq = req.body;
        console.log(userReq);
        if (!userReq.email || !userReq.fullname || !userReq.password) {
            return res.status(404).json({
                message: "not field blank!"
            });
        }
        try {
            let admin = await User.findOne({ email: userReq.email });
            if (admin == null) {
                let _user = new User(userReq);
                let save = await _user.save();
                console.log(save);
                return res.status(200).json({
                    message: "create user ok!"
                });
            }
            return res.status(404).json({
                message: "user existed!"
            });
        } catch (err) {
            return res.status(404).json({ message: "create user error!" });
        }
    }
};

// require('crypto').randomBytes(64).toString('hex')