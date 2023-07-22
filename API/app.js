const express = require('express');
const placesRoutes = require('./routes/places-routes');

const PORT = 5000;

const app = express();
app.use('/api/places', placesRoutes);

// Default error handler
app.use((error, req, res, next) => {
    if (res?.headersSent) return next(error);

    res?.status(error?.code || 500);
    res?.json({
        message: error?.message || 'An unknown error occurred.'
    });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
