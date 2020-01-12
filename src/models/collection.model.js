const mongoose = require('mongoose');
const { Schema } = mongoose;

/* const Collection = new Schema({
    description: { type: String, required: false },
    gender: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gender'
    }]
}); */
const Collection = new Schema({
    description: { type: String, required: true },
    gender: {  type: mongoose.Schema.Types.ObjectId, ref: 'Gender' },
    sizes: {  type: mongoose.Schema.Types.ObjectId, ref: 'Sizes' },
    special: { type: Boolean, default: false },
    expiry: { type: Date, required: false  }
});

module.exports = mongoose.model('Collection', Collection);