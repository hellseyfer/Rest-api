const mongoose = require('mongoose');
const { Schema } = mongoose;
const imageSchema = require('../models/image.model');
const sizeSchema = require ('../models/size.model');

/* const Variation = new Schema({
    description: { type: String, required: true },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }]
}); */
const Variation = new Schema({
    description: { type: String, required: true },
    sizes: [ sizeSchema.schema ],
    images: [ imageSchema.schema ]
});

module.exports = mongoose.model('Variation', Variation);