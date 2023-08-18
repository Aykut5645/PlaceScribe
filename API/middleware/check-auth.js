const { verify } = require("jsonwebtoken");
const HttpError = require("../models/Http-error");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Authentication failed.');
        }

        const decodedToken = verify(token, process.env.JWT_PRIVATE_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch(err) {
        console.log(err);
        return next(
            new HttpError(err.message, 401)
        );
    }
};
