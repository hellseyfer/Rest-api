/*
const mongoose = require('mongoose');

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
*/

//require the gridfs-easy and mongoose
let mongoose = require('mongoose');
let gridfsEasy = require('gridfs-easy');

if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}

//establish the connection with mongoose
mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

//export the gridfsEasy so that you can use it everywhere
/*
module.exports = new Promise(function (resolve, reject) {

    //make sure you've successfully connected
    mongoose.connection.on('connected', function () {

        //initialize the gridfs-easy
        let gfsEasy = new gridfsEasy(mongoose);
        resolve(gfsEasy);
    });
});
*/