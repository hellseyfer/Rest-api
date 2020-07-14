// const path = require('path');
// const fileUpload = require('express-fileupload');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
//const { mongoose } = require('./database');
const connectDB = require('./database');
const funcUpload = require('./routes/upload2.routes');
const bodyParser = require('body-parser');
/* const https = require("https"),
    fs = require("fs"); */
const productCtrl = require('./controllers/product.controller');
const app = express();

/* Settings
************************************************************************/
connectDB();
app.set('port', process.env.PORT || 8080);

if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    dotenv.config({ path: __dirname + '/.env' });
}

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname);
    }
});

/* Middlewares (cada vez que llega una peticion, va a pasar por estas funciones)
************************************************************************/
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
app.use(express.json());
// CORS config
var originsWhitelist = [
    'http://localhost:4200',      //this is my front-end url for development
    'http://localhost:8080',
    'https://korago.shop',  // my production domain url
    'https://www.korago.shop',  // my production domain url
    'https://ipgeolocation.com/',
    'https://app-ecom.herokuapp.com'
];
var corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}
//here is the magic
app.use(cors(corsOptions));

//app.use(cors());
// const upload = app.use(multer({storage}).single('file'));
// const upload = single('file');
const upload = multer({ storage });


/* Starting the server
************************************************************************/


const server = app.listen(app.get('port'), () => {
    console.log("Listening server on port..", app.get('port'));
    console.log('Environment: ', process.env.NODE_ENV);
	// Here we send the ready signal to PM2
	//process.send('ready');
});
//https.createServer(options, app).listen(8080);

/* Websockets
************************************************************************/

const socketIo = require('socket.io');
const io = socketIo(server);
io.origins('*:*');
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
        /*     socket.removeAllListeners('disconnect');
            io.removeAllListeners('connection'); */
        console.log('user disconnected');
    });
    socket.on('modified', (data) => {
        io.emit('product_modified');
        console.log('producto modificado: ', data);
    });
    socket.on('new', (data) => {
        io.emit('product_new');
        console.log('nuevo producto: ', data);
    });
    socket.on('delete', (data) => {
        io.emit('product_deleted');
        console.log('producto borrado: ', data);
    });
    socket.on('real_time_products', arr => {
        //arrProds = arr;
        //console.log(arr);
        productCtrl.getProdUpdates(arr, socket);

    });
});

/* Routes
************************************************************************/
app.use('/products', require('./routes/products.routes'));
app.use('/product', require('./routes/product.routes'));
app.use('/files', upload.array('file'), funcUpload);    // multiple uploads
// app.use('/files', upload.single('file'), funcUpload);    // single upload
app.use('/genders', require('./routes/gender.routes'));
app.use('/collections', require('./routes/collections.routes'));
app.use('/collection', require('./routes/collection.routes'));
app.use('/brands', require('./routes/brands.routes'));
app.use('/materials', require('./routes/materials.routes'));
app.use('/sizes', require('./routes/sizes.routes'));
app.use('/seller', require('./routes/seller.routes'));
app.use('/invoice', require('./routes/invoice.routes'));
app.use('/address', require('./routes/address.routes'));
app.use('/ordstatus', require('./routes/ordstatus.routes'));
