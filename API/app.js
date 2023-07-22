const express = require('express');

const placesRoutes = require('./routes/places-routes');

const PORT = 5000;

const app = express();
app.use('/api/places', placesRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
