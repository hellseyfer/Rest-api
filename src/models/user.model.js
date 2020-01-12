const mongoose = require('mongoose');
const { Schema } = mongoose;
const checkoutSchema = require ('./invoice.model');
const addressSchema = require ('./address.model');

const User = new Schema({
    UID: { type: String, required: true },
    invoices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }],
    addresses: [ addressSchema.schema ]
});



module.exports = mongoose.model('User', User);