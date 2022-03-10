const mongoose = require('mongoose');
const { Schema } = mongoose;

const TwoCheckOrderSchema = new Schema({}, { strict: false });


module.exports = mongoose.model('TwoCheckOrders', TwoCheckOrderSchema);