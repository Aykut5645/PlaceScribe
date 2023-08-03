const { Schema, model, Types } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    imageUrl: { type: String, required: true },
    places: [{ type: Types.ObjectId, required: true, ref: 'Place'}],
});

schema.plugin(uniqueValidator);

module.exports = model('User', schema);