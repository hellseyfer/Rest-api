const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    title: { type: String, required: true },
    brand: { type: String, required: false },
    price: { type: Number, required: true },
    materials: { type: Array, required: false },
    images: { type: Array, required: true }
});

module.exports = mongoose.model('product', ProductSchema);