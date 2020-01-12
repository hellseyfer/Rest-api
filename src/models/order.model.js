const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema = require ('./product.model');

const Order = new Schema({
    canceled: { type: Boolean, required: true },
    quantity: { type: Number, required: true },
    size: { type: Number, required: true },
    sub_total: { type: Number, required: true },
    varia: { type: Number, required: true },
    product:  productSchema.schema
    //product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Order', Order);