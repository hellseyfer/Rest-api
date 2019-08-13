const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageSchema = new Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    imageURL: { type: String, required: true },
    public_id: { type: String, required: true }
});

module.exports = mongoose.model('image', ImageSchema);