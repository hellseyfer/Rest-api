const mongoose = require('mongoose');
const { Schema } = mongoose;
const variaSchema = require('../models/variation.model');

/* const Product = new Schema({
    title: { type: String, required: true },
    brand: { type: String, required: false },
    price: { type: Number, required: true },
    materials: { type: Array, required: false },
    variations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variation'
    }],
    gender: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gender'
    }],
},  {
    timestamps: true
}); */
const Product = new Schema({
    title: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    materials: { type: Array, required: false },
    varia: [ variaSchema.schema ],
    gender: {  type: mongoose.Schema.Types.ObjectId, ref: 'Gender' },
    colle: [{   type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
    description: { type: String, required: false },
    status: { type: String, default: 'active' },
    weight: { type: Number, required: true },
    region: { type: String, required: true }
    //inland_ship_cost: { type: Number, required: false}
},
    {
    timestamps: true
});


module.exports = mongoose.model('Product', Product);