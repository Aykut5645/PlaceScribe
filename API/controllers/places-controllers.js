const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');

const Place = require('../models/Place');
const HttpError = require('../models/Http-error');
const getCoordsForAddress = require("../util/location");

let DUMMY_PLACES = [{
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the famous sky scrapers in the world',
    location: {
        lat: 40.7484474,
        lng: -73.9882393,
    },
    address: '20 W 34th St., New York, NY 10001, United States',
    creator: 'u1',
}];

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    let currentPlace;

    try {
        currentPlace = await Place.findById(placeId);
    } catch (err) {
        return next(
            new HttpError('Something went wrong. Could not find a place by given id.', 500)
        );
    }

    if (!currentPlace) {
        return next(new HttpError(
            'Could not find a place for the provided id.',
            404
        ));
    }

    res.json({ place: currentPlace.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let currentPlaces;

    try {
        currentPlaces = await Place.find({ creator: userId });
    } catch (err) {
        return next(
            new HttpError('Fetching places failed. Please try again later.', 500)
        );
    }

    if (currentPlaces?.length === 0) {
        return next(
            new HttpError(
                'Could not find a user for the provided id.',
                404
            )
        );
    }
    res.json({ places: currentPlaces.map(place => place.toObject({ getters: true })) });
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { title, description, address, creator } = req.body;
    let coordinates;

    try {
        coordinates = await getCoordsForAddress(address);
    } catch(error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        imageUrl: 'https://s39023.pcdn.co/wp-content/uploads/2022/10/Where-Are-Those-Morgans-Empire-State-Building-728x546.jpg.optimal.jpg',
        creator,
    });

    try {
        await createdPlace.save();
    } catch (err) {
        return next(
            new HttpError('Creating place failed. Please try again.', 500)
        );
    }

    res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const { title, description } = req.body;
    const placeId = req.params.pid;
    let existingPlace;

    try {
        existingPlace = await Place.findById(placeId);
    } catch (err) {
        return next(
            new HttpError('Something went wrong. Could not update a place.', 500)
        );
    }
    existingPlace.title = title;
    existingPlace.description = description;

    try {
        await existingPlace.save();
    } catch (err) {
        return next(
            new HttpError('Updating place failed. Please try again.', 500)
        );
    }

    res.status(200).json({ place: existingPlace.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;
    let existingPlace;

    try {
        existingPlace = await Place.findById(placeId);
    } catch (err) {
        return next(
            new HttpError('Something went wrong. Could not delete a place.', 500)
        );
    }

    try {
        await existingPlace.deleteOne();
    } catch (err) {
        return next(
            new HttpError('Something went wrong. Could not delete a place.', 500)
        );
    }

    res.status(200).json({ message: 'Deleted successfully' });
};

module.exports = {
    getPlaceById,
    getPlacesByUserId,
    createPlace,
    updatePlace,
    deletePlace,
};