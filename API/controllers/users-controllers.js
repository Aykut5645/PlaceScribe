const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');

const User = require('../models/User');
const HttpError = require('../models/Http-error');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'John Johnson',
        email: 'test@test.com',
        password: 'test'
    }
];

const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const { name, email, password, places } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch(err) {
        return next(
            new HttpError('Signing up failed, please try again later.', 500)
        );
    }

    if (existingUser) {
        return next(
            new HttpError('Could not create user, email already exists.', 422)
        );
    }

    const createdUser = new User({
        name,
        email,
        password,
        imageUrl: 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
        places,
    });

    try {
        await createdUser.save();
    } catch (err) {
        return next(
            new HttpError('Signing up failed. Please try again later.', 500)
        );
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
    const { email, password } = req.body;
    const identifiedUser = DUMMY_USERS.find(user => user.email === email);

    if (!identifiedUser || identifiedUser.password !== password) {
        return next(
            new HttpError('Could not identify user, credentials seem to be wrong.', 401)
        );
    }

    res.json({ message: 'Logged in!' });
};

module.exports = {
    getUsers,
    signup,
    login,
};