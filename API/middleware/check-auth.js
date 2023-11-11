const { verify } = require("jsonwebtoken");

const { jwtKey } = require('../config');
const HttpError = require("../models/Http-error");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Authentication failed.');
        }

        const decodedToken = verify(token, jwtKey);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch(err) {
        return next(
            new HttpError(err.message, 401)
        );
    }
};
