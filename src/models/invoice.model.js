const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderSchema = require('./order.model');
const order_counter = require('./order_counter.model');
const addressSchema = require('./address.model');

const InvoiceSchema = new Schema({
    number: { type: Number, default: 0 },
    items: [orderSchema.schema], // array of orders
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    shippingInfo: [ addressSchema.schema ],
    status: { type:String, default: 'order placed'},
    carrier: {  type: String, required: true  },
});

// do this before Model.'save'
InvoiceSchema.pre('save', function(next) {
    var doc = this;
    order_counter.findByIdAndUpdate({_id: 'counter_id'}, {$inc: { seq: 1} }, { upsert: true, new: true }, function(error, counter)   {
        if(error)
            return next(error);
        console.log('doing pre stuff');
        doc.number = counter.seq;
        next();
    });
});

/* User.pre('updateOne', function(next) {
    var doc = this;
    order_counter.findByIdAndUpdate({_id: 'counter_id'}, {$inc: { seq: 1} }, { upsert: true, new: true }, function(error, counter)   {
        if(error)
            return next(error);
        console.log('doing pre stuff');
        doc.shopping.number = counter.seq;
        next();
    });
});
 */

module.exports = mongoose.model('Invoice', InvoiceSchema);