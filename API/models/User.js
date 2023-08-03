const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },
    places: { type: String, required: true },
});

schema.plugin(uniqueValidator);

module.exports = model('User', schema);