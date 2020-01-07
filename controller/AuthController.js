const { User } = require("../schema/index");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model");

const arrUser = [{
        fullname: "dang quang vu",
        email: "dangquangvu999@gmail.com",
        password: "admin",
        role: "user"
    },
    {
        fullname: "dang tuan phat",
        email: "dangvu9981@gmail.com",
        password: "admin",
        role: "user"
    }
];
module.exports = {
    getLogin: (req, res) => {
        // console.log(req.user);
        return res.status(200).json({
            message: req.user
        });
        //arrUser.filter(user => user.email === req.user.email)
    },
    postLogin: async(req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        try {
            let indentify = User.findOne;
            let user = await UserModel.findByEmail(email);
            let comparePassword;
            console.log(user);
            if (!user) {
                return res.status(400).json({ message: "Account doesnt exists" });
            }
            await user.comparePassword(password).then(data => {
                comparePassword = data;
            });

            if (!comparePassword) {
                return res.status(404).json({
                    message: "Incorrect username and password"
                });
            }
            const _user = {
                fullname: user.fullname,
                email: user.email,
                password: user.password,
                role: user.role,
                _id: user._id
            };
            let accessToken = auth.generateAccessToken(_user);
            let refreshToken = jwt.sign(_user, process.env.Refresh_token);
            res.cookie("access_token", accessToken, {
                maxAge: 1800,
                httpOnly: true
                    //secure: true;
            });
            return res
                .status(200)
                .json({ accessToken: accessToken, refreshToken: refreshToken });
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                message: "error!"
            });
        }
    },
    init: async(req, res, next) => {
        let fullname = "admin";
        let email = "admin@gmail.com";
        let password = "admin123";
        let role = "admin";
        let userInit = {
            fullname: fullname,
            email: email,
            password: password,
            role: role
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