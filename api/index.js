const express = require('express');
const config = require('../config.js');
const currency = require('./components/currency/network');
const rates = require('./components/rates/network')
const error = require('../network/error');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use('/currencies', currency);
app.use('/rates', rates)

// Middleware for errors
app.use(error);

app.listen(config.api.port, () => {
    console.log(`http://localhost:${config.api.port}`);
})
