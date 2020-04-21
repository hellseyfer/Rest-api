//require the gridfs-easy and mongoose
let mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);
let gridfsEasy = require('gridfs-easy');

/* if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  } */
require('dotenv').config();

//establish the connection with mongoose
const URI = 'mongodb+srv://'+process.env.MONGO_USER+ ':'+process.env.MONGO_PASS + '@cluster0-xigay.mongodb.net/'+process.env.MONGO_DB+'?retryWrites=true&w=majority';
//const URI2 = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-xigay.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
console.log(URI);
const connectDB = async () => {
    await mongoose.connect(URI || process.env.MONGO_DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        serverSelectionTimeoutMS: 5000
    })
        .then(db => console.log('db connected to sv..!'))
        .catch(err => console.error(err));
}


module.exports = connectDB;