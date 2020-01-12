const mongoose = require('mongoose');
const { Schema } = mongoose;

const Size = new Schema({
    description: { type: String, required: true },
    stock: { type: Number, required: false }
});

module.exports = mongoose.model('Size', Size);