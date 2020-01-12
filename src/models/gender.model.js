const mongoose = require('mongoose');
const { Schema } = mongoose;

const Gender = new Schema({
    description: { type: String, required: false },
});

module.exports = mongoose.model('Gender', Gender);