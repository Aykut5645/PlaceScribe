const uuid = require('uuid').v4;

const HttpError = require('../models/http-error');

const DUMMY_PLACES = [{
    id: 'p1',
    name: 'Empire State Building',
    description: 'One of the famous sky scrapers in the world',
    location: {
        lat: 40.7484474,
        lng: -73.9882393,
    },
    address: '20 W 34th St., New York, NY 10001, United States',
    creator: 'u1',
}];

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const currentPlace = DUMMY_PLACES.find(place => place.id === placeId);

    if (!currentPlace) {
        return next(new HttpError(
            'Could not find a place for the provided id.',
            404
        ));
    }
    res.json({ place: currentPlace });
};

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const currentPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

    if (currentPlaces.length === 0) {
        return next(
            new HttpError(
                'Could not find a user for the provided id.',
                404
            )
        );
    }
    res.json({ places: [ ...currentPlaces ] });
};

const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };
    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({ place: createdPlace });
};

module.exports = {
    getPlaceById,
    getPlaceByUserId,
    createPlace,
};