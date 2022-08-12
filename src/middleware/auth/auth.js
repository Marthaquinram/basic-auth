const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');
require("dotenv").config();

function validateToken(req, res, next) {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    const token = req.headers['authorization'];
    if (token) {
        try {
            const user = jwt.verify(token, SECRET);
            req.user = user;
        } catch (e) {
            res.status(403).send("You are unauthorized");
        }
    }
    next();
}
//test test
module.exports = validateToken;
