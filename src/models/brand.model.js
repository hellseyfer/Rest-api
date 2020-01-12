const mongoose = require('mongoose');
const { Schema } = mongoose;

const Brand = new Schema({
    description: { type: String, required: true },
});

module.exports = mongoose.model('Brand', Brand);