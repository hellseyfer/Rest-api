const mongoose = require('mongoose');
const { Schema } = mongoose;

/* const Seller = new Schema({
    _id: String, // this is my UID user from firebase auth
    UID: { type: String, required: true },
    stocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { _id: false }
); */
const Seller = new Schema({
    UID: { type: String, required: true },
    stocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    status: { type: String, default: 'active' }
}
);

module.exports = mongoose.model('Seller', Seller);