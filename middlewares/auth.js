const jwt = require("jsonwebtoken");
module.exports = {
    authenticateToken: (req, res, next) => {
        console.log(req.headers["authorization"]);
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.Secret_jwt, (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: "error"
                });
            }
            console.log(user);
            req.user = user;
            req.jwtDecode = user;
            next();
        });
    },
    generateAccessToken: user => {
        return jwt.sign(user, process.env.Secret_jwt, { expiresIn: "5000" });
    },
    refreshToken: async(req, res) => {}
};