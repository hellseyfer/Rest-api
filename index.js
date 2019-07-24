const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const PORT = 3000;
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.set('transports', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket']);
io.set('origins', '*:*');
io.of('/socket-server').on('connection', function (socket) {
  // do something...
});


const {
    mongoose
} = require('./database');

// Settings
// app.set('port', process.env.PORT || 3000);

// Middlewares (cada vez que llega una peticion, va a pasar por estas funciones)
app.use(morgan('dev'));
app.use(express.json());
// app.use(cors({origin: 'http://localhost:4200'}));
app.use(cors());
app.use(function (req, res, next) {
    const origin = req.headers.origin
    if (typeof origin === 'undefined') {
      // No Cross Origin redirect
      res.header('Access-Control-Allow-Origin', '*')
    } else if (
      (origin.indexOf('http://localhost')) === 0 ||
      (origin.indexOf('http://172.16.') === 0) ||
      (origin.indexOf('http://192.168.1.') === 0) ||
      (origin.indexOf('http://admin.anguer.com') === 0) ||
      (origin.indexOf('http://chat.anguer.com') === 0)
    ) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Credentials', 'true')
    } else {
      res.header('Access-Control-Allow-Origin', 'http://localhost')
    }
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, X-Access-Token')
  
    next()
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/indexs.html');
});

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



// Routes
app.use('/api/products', require('./routes/product.routes'));

// Starting the server

/*
app.listen(PORT, () => {
    console.log("server on port 3000", app.get('port'));
});
*/
/*
http.listen(3000, () => {
    console.log('listening on *:3000');
});
*/
/*
http.listen(3000, () => {
    console.log('listening on *:3000');
});
*/

io.listen(PORT, () => {
	console.log('Servidor corriendo en puerto: ', PORT);
});