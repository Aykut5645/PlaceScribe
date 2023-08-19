const { startSession } = require("mongoose");
const { validationResult } = require('express-validator');
const fs = require('fs');

const Place = require('../models/Place');
const User = require('../models/User');
const HttpError = require('../models/Http-error');
const getCoordsForAddress = require("../util/location");

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
        // userWithPlaces = await User.findById(userId).populate('places');
    } catch (err) {
        return next(
            new HttpError('Fetching places failed. Please try again later.', 500)
        );
    }

    // if (currentPlaces?.length === 0) {
    //     return next(
    //         new HttpError(
    //             'Could not find a user for the provided id.',
    //             404
    //         )
    //     );
    // }

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
        imageUrl: req.file.path,
        creator,
    });

    let user;
    try {
        user = await User.findById(creator);
    } catch (err) {
        return next(
            new HttpError('Creating place failed, please try again', 500)
        );
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided id', 404);
        return next(error);
    }

    try {
        const session = await startSession();
        await session.withTransaction(async () => {
            await createdPlace.save();
            user.places.push(createdPlace);
            await user.save();
        });
    } catch (err) {
        return next(
            new HttpError('Creating place failed. Please try again.', 500)
        );
    }

    res.status(201).json({ message: 'The place has been created successfully!', userId: creator });
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

    res.status(200).json({ message: 'The place has been updated successfully!' });
};

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;
    let existingPlace;

    try {
        existingPlace = await Place.findById(placeId).populate('creator');
    } catch (err) {
        return next(
            new HttpError('Something went wrong. Could not delete a place.', 500)
        );
    }

    if (!existingPlace) {
        return next(
            new HttpError('Could not find place for this id.', 404)
        );
    }

    const imagePath = existingPlace.imageUrl;

    try {
        const session = await startSession();
        await session.withTransaction(async () => {
            await existingPlace.deleteOne();
            existingPlace.creator.places.pull(existingPlace);
            await existingPlace.creator.save();
        });
    } catch (err) {
        return next(
            new HttpError('Something went wrong. Could not delete a place.', 500)
        );
    }

    fs.unlink(imagePath, (err) => console.log(err));

    res.status(200).json({ message: 'Deleted successfully' });
};

module.exports = {
    getPlaceById,
    getPlacesByUserId,
    createPlace,
    updatePlace,
    deletePlace,
};