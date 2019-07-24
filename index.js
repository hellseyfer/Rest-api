// const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
let app = express();
/*
const server = require('http').Server(app);
const io = require('socket.io')(server);
*/
const socketIo = require('socket.io');
const io = socketIo(server);

const { mongoose } = require('./database');

/* Settings
************************************************************************/
app.set('port', process.env.PORT || 3000);

/* Middlewares (cada vez que llega una peticion, va a pasar por estas funciones)
************************************************************************/
app.use(morgan('dev'));
app.use(express.json());
// app.use(cors({origin: 'http://localhost:4200'}));
app.use(cors());
io.origins('*:*');
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/indexs.html');
});

/* Websockets
************************************************************************/
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

/* Starting the server
************************************************************************/
const server = app.listen(app.get('port'), () => {
    console.log("Listening server on port..", app.get('port'));
});