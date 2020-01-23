const mongoose = require('mongoose');
const { Schema } = mongoose;

const countrySchema = new Schema({
    name: { type: String, required: true },
    subregion: { type: String, required: true },
})

const AddressSchema = new Schema({
    city: { type: String, required: true },
    //country: { type: String, required: true },
    country: [ countrySchema ],
    otherInfo: { type: String },
    state: { type: String, required: true },
    street: { type: String, required: true },
    zip: { type: Number, required: true }
})
const ShippingInfoSchema = new Schema({
    address: [ AddressSchema ],    
    alias: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: Number },
});

module.exports = mongoose.model('Address', ShippingInfoSchema);