const { validationResult } = require('express-validator');
const { hash, compare } = require('bcryptjs');
const { sign} = require('jsonwebtoken');

const User = require('../models/User');
const HttpError = require('../models/Http-error');

const getUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find({}, '-password');
    } catch(err) {
        return next(
            new HttpError('Fetching users failed, please try again later.', 500)
        );
    }

    res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const { name, email, password } = req.body;
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

    let hashedPassword;
    try {
        hashedPassword = await hash(password, 12);
    } catch(err) {
        return next(
            new HttpError('Could not create user, please try again again.', 500)
        );
    }

    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        imageUrl: 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
        places: [],
    });

    try {
        await createdUser.save();
    } catch (err) {
        return next(
            new HttpError('Signing up failed. Please try again later.', 500)
        );
    }

    let token;
    try {
        token = sign({
            usedId: createdUser.id,
            email: createdUser.email,
        }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
    } catch(err) {
        return next(
            new HttpError('Signing up failed. Please try again later.', 500)
        );
    }

    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch(err) {
        return next(
            new HttpError('Invalid credentials, could not log you in.', 500)
        );
    }

    if (!existingUser) {
        return next(
            new HttpError('Could not identify user, credentials seem to be wrong.', 401)
        );
    }

    let isValidPassword = false;
    try {
        isValidPassword = await compare(password, existingUser.password);
    } catch(err) {
        return next(
            new HttpError('Could not log you in, credentials seem to be wrong, please try again.', 500)
        );
    }

    if (!isValidPassword) {
        return next(
            new HttpError('Could not identify user, credentials seem to be wrong.', 401)
        );
    }

    let token;
    try {
        token = sign({
            usedId: existingUser.id,
            email: existingUser.email,
        }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
    } catch(err) {
        return next(
            new HttpError('Signing in failed. Please try again later.', 500)
        );
    }

    res.json({ userId: existingUser.id, email: existingUser.email, token });
};

module.exports = {
    getUsers,
    signup,
    login,
};