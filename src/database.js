//require the gridfs-easy and mongoose
let mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);
let gridfsEasy = require('gridfs-easy');

if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}
//asd
require('dotenv').config();
//establish the connection with mongoose
//mongoose.connect(`${process.env.MONGO_URI}`, {



/* mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-xigay.mongodb.net/${process.env.MONGO_DB}?authSource=admin&retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err)); */


const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.MONGO_URIprod, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("genders");
    console.log('DB is connected');
    // perform actions on the collection object
    client.close();
});