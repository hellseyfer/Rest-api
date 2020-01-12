const mongoose = require('mongoose');
const { Schema } = mongoose;

var Order_counterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

module.exports = mongoose.model('Order_counter',Order_counterSchema);