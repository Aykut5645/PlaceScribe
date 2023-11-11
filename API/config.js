require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    apiKey: process.env.API_KEY,
    jwtKey: process.env.JWT_PRIVATE_KEY,
};
