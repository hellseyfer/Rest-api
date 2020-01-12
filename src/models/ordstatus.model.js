const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrdstatusSchema = new Schema({
    desc: { type: String, required: true },
});

module.exports = mongoose.model('Ordstatus', OrdstatusSchema, 'ordstatus');