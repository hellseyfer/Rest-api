const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();


const { mongoose } = require('./database');


// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares (cada vez que llega una peticion, va a pasar por estas funciones)
app.use(morgan('dev'));
app.use(express.json());
// app.use(cors({origin: 'http://localhost:4200'}));
app.use(cors());

// Routes
app.use('/api/products', require('./routes/product.routes'));

// Starting the server

app.listen(app.get('port'), () => {
    console.log("server on port 3000", app.get('port'));
});

