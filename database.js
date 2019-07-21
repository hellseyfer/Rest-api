const mongoose = require('mongoose');

// const URI = 'mongodb://localhost/mean-crud';
const URI = 'mongodb+srv://hellseyfer:_Himjoinme669@cluster0-xigay.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;