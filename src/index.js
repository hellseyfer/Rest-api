// const path = require('path');
// const fileUpload = require('express-fileupload');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const { mongoose } = require('./database');
const funcUpload = require('./routes/upload2.routes');
const bodyParser = require('body-parser');

const app = express();


/*
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();
let path = require('path');
*/


if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}



/* Settings
************************************************************************/
app.set('port', process.env.PORT || 3000);  // o bien toma el puerto que se le asigna o el 3000
let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './src/public/uploads');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
    }
});

/* Middlewares (cada vez que llega una peticion, va a pasar por estas funciones)
************************************************************************/
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(morgan('dev'));
app.use(express.json());
// app.use(cors({origin: 'http://localhost:4200'}));
app.use(cors());
// const upload = app.use(multer({storage}).single('file'));
// const upload = single('file');
const upload = multer({storage});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// app.use(express.static(path.join(__dirname, 'public')));

/* Starting the server
************************************************************************/
const server = app.listen(app.get('port'), () => {
    console.log("Listening server on port..", app.get('port'));
    console.log('Environment: ', process.env.NODE_ENV);
});

/* Websockets
************************************************************************/
const socketIo = require('socket.io');
const io = socketIo(server);
io.origins('*:*');
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
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
    })
});

/* Routes
************************************************************************/
app.use('/api/products', require('./routes/product.routes'));
// app.post('/upload', require('./controllers/upload.controller'));
// app.use('/upload', require('./routes/upload3.routes'));
app.use('/files', upload.array('file'), funcUpload);    // multiple uploads
// app.use('/files', upload.single('file'), funcUpload);    // single upload
app.use('/gfs', require('./routes/upload.routes'));