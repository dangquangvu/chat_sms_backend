// const { User } = require("../schema/index");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const { UserModel, ConversationModel, MessageModel } = require("../model");

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
    signIn: async(req, res) => {
        if (!req.body.email || !req.body.password || !req.body.fullname)
            return res.status(404).json({ message: "field not blank!" });
        const email = req.body.email;
        const password = req.body.password;
        const fullname = req.body.fullname;
        if (email) {
            try {
                let user = await UserModel.findByEmail(email);
                if (user) {
                    return res.status(400).json({ message: "Account did exists" });
                }
                const _user = {
                    fullname: fullname,
                    email: email,
                    password: password
                };
                let createUser = await UserModel.createUser(_user);
                console.log(createUser, 3456);
                if (createUser) {
                    return res.status(200).json({
                        message: "create ok!"
                    });
                }
                return res.status(404).json({
                    message: "create user not success!"
                });
            } catch (error) {
                return res.status(404).json({
                    message: "error!"
                });
            }
        }
    },
    getLogin: (req, res) => {
        return res.status(200).json({
            message: req.user
        });
        //arrUser.filter(user => user.email === req.user.email)
    },
    postLogin: async(req, res) => {
        if (!req.body.email || !req.body.password)
            return res.status(404).json({ message: "field not blank!" });
        const email = req.body.email;
        const password = req.body.password;
        if (email && password) {
            try {
                // let indentify = User.findOne;
                let user = await UserModel.findByEmail(email);
                let comparePassword;
                // console.log(user);
                if (!user) {
                    return res.status(400).json({ message: "Account didn't exists" });
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
                // req.user = _user;
                // res.cookie("access_token", accessToken, {
                //     maxAge: 1800,
                //     httpOnly: true
                //         //secure: true;
                // });
                return res.status(200).json({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    user: _user
                });
            } catch (error) {
                console.log(error);
                return res.status(404).json({
                    message: "error!"
                });
            }
        }
    },
    init: async(req, res) => {
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
            let admin = await UserModel.findByEmail("admin@gmail.com");
            if (!admin) {
                let createUser = await UserModel.createUser(userInit);
                if (!createUser) {
                    return res.status(404).json({
                        message: "create user not success!"
                    });
                }
                return res.status(200).json({
                    message: "create ok!"
                });
            }
            return res.status(400).json({
                message: "user exist!"
            });
        } catch (err) {
            return res.status(404).json({
                message: "create user error!"
            });
        }
    },
    test: (req, res) => {
        return res.status(200).json({ message: "ok" });
    },
    verifyToken: (req, res) => {
        const token = req.body.token;
        if (token == null)
            return res.status(404).json({
                message: "not found!"
            });

        jwt.verify(token, process.env.Secret_jwt, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: "error"
                });
            }
            // console.log(user);
            return res.status(200).json({
                user: user,
                token: token
            });
        });
    },
    getFriend: async(req, res) => {
        let data = await UserModel.findAll();
        console.log(data);
        return res.status(200).json({ data });
    },
    getMessage: async(req, res) => {
        console.log(req.body);
        let conversationID = await ConversationModel.findByName(req.body);
        let data = await MessageModel.findAll();

        if (!data) {
            return res.status(404).json({
                message: "err",
                conversationID: conversationID
            });
        }
        return res.status(200).json({
            message: data,
            conversationID: conversationID
        });
    },
    sendMessage: async(req, res) => {
        console.log(req.body);
        let data = await MessageModel.save(req.body);
        if (!data) {
            return res.status(404).json({
                message: "err"
            });
        }
        return res.status(200).json({
            message: "ok"
        });
    },
    setConversation: async(req, res) => {
        console.log(req.body);
        let data = await ConversationModel.createConversation(req.body);
        return res.status(200).json({
            message: "ok"
        });
    }
};