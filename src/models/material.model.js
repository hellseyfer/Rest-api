const mongoose = require('mongoose');
const { Schema } = mongoose;

const Material = new Schema({
    description: { type: String, required: true },
});

module.exports = mongoose.model('Material', Material);