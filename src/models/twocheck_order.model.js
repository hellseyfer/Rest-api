const mongoose = require('mongoose');
const { Schema } = mongoose;

var TwoCheckOrderSchema = new Schema({}, { strict: false });


module.exports = mongoose.model('TwoCheckOrders', TwoCheckOrderSchema);