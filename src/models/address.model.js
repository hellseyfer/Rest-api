const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddressSchema = new Schema({
    city: { type: String, required: true },
    country: { type: String, required: true },
    otherInfo: { type: String },
    state: { type: String, required: true },
    street: { type: String, required: true },
    zip: { type: Number, required: true },
})
const ShippingInfoSchema = new Schema({
    address: [ AddressSchema ],    
    alias: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: Number },
});

module.exports = mongoose.model('Address', ShippingInfoSchema);