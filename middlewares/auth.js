const jwt = require("jsonwebtoken");
module.exports = {
    authenticateToken: (req, res, next) => {
        // console.log(req.headers["authorization"]);
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.Secret_jwt, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    },
    generateAccessToken: user => {
        return jwt.sign(user, process.env.Secret_jwt, { expiresIn: "3600s" });
    }
};