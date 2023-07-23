const express = require('express');

const usersRoutes = require('./routes/users-routes');
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');

const PORT = 5000;

const app = express();

app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/places', placesRoutes);

app.use((req, res) => {
    // Error can be thrown in case of synchronous code, upon asynchronous - next()!!!
    throw new HttpError('Could not find this route.', 404);
});
app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);

    res.status(error.code || 500);
    res.json({
        message: error.message || 'An unknown error occurred.'
    });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
