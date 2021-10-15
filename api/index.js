const express = require('express');
const config = require('../config.js');
const currency = require('./components/currency/network');
const rates = require('./components/rates/network')
const error = require('../network/error');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Router
app.use('/currencies', currency);
app.use('/rates', rates)

// Middleware for errors
app.use(error);

app.listen(config.api.port, () => {
    console.log(`http://localhost:${config.api.port}`);
})
