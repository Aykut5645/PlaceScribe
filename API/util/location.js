const axios = require("axios");

const { apiKey } = require('../config');
const HttpError = require("../models/Http-error");

const getCoordsForAddress = async (address) => {
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);

    if (data?.status === 'ZERO_RESULTS') {
        throw new HttpError(
            'Could not find location for the specified address.',
            422
        );
    }

    // coordinates
    return data.results[0].geometry.location;
};

module.exports = getCoordsForAddress;
