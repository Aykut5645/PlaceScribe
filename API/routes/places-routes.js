const router = require('express').Router();

const placesControllers = require('../controllers/places-controller');

router.get('/:pid', placesControllers.getPlaceById);
router.get('/user/:uid', placesControllers.getPlaceByUserId);
router.post('/', placesControllers.createPlace);

module.exports = router;