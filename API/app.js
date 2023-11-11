const express = require('express');
const { connect } = require("mongoose");

const fs = require('fs');
const path = require('path');
const { mongoUri, port } = require('./config');

const usersRoutes = require('./routes/users-routes');
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/Http-error');

const app = express();

app.use(express.json());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use('/api/users', usersRoutes);
app.use('/api/places', placesRoutes);

app.use((req, res) => {
    throw new HttpError('Could not find this route.', 404);
});
app.use((error, req, res, next) => {
    if (req.file) fs.unlink(req.file.path, (err) => console.log(err));
    if (res.headersSent) return next(error);

    res.status(error.code || 500);
    res.json({
        message: error.message || 'An unknown error occurred.'
    });
});

connect(mongoUri)
    .then(() => {
        app.listen(
            port,
            () => console.log(`Server is listening on port ${port}...`)
        );
    })
    .catch((err) => console.log('Database connection error => ', err));
