const mongoose = require('mongoose');
const { Schema } = mongoose;
const sizeSchema = require ('../models/size.model');

const Sizes = new Schema({
    description: { type: String, required: true },
    size: [ sizeSchema.schema ]
});

module.exports = mongoose.model('Sizes', Sizes);