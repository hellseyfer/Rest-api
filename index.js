const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const PORT = 3000;
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

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
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
});

io.set('transports', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket']);
io.origins();

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

server.listen(PORT, () => {
	console.log('Servidor corriendo en puerto: ', PORT);
});

io.listen(server);