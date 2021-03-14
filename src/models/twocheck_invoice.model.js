const mongoose = require('mongoose');
const { Schema } = mongoose;

var TwoCheckInvoiceSchema = new Schema({}, { strict: false });


module.exports = mongoose.model('TwoCheckInvoices', TwoCheckInvoiceSchema);