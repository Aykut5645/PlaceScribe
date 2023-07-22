const router = require('express').Router();

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

router.get('/:pid', (req, res) => {
    const placeId = req.params.pid;
    const currentPlace = DUMMY_PLACES.find(place => place.id === placeId);

    res.json({ place: currentPlace });
});

router.get('/user/:uid', (req, res) => {
    const userId = req.params.uid;
    const currentPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

    res.json({ places: [ ...currentPlaces ] });
});

module.exports = router;