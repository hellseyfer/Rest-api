const mongoose = require('mongoose');
const { Schema } = mongoose;

const TwoCheckInvoiceSchema = new Schema({}, { strict: false });

module.exports = mongoose.model('TwoCheckInvoices', TwoCheckInvoiceSchema);