const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

SECRET_KEY = "sshhh!!itssecretofvishal###lol"

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) return res.status(401).json({ message: "Unauthorized user" });
        token = token.split(" ")[1];
        let user = jwt.verify(token, SECRET_KEY);
        req.userId = user.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized user" });
    }
}


module.exports = auth;