const express = require('express');
const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router();

// get list to currencies
router.get('/', (req, res, next) => {
    controller.list()
        .then( (list) => {
            response.success(req, res, list, 200)
        }).catch(next);
});

// get currency for id
router.get('/:id', (req, res, next) => {
    controller.get(req.params.id)
        .then( (currency) => {
            response.success(req, res, currency, 200)
        }).catch(next);
});

// update or insert currency in database
router.post('/', (req, res, next) => {
    controller.upsert(req.body)
        .then( (currency) => {
            response.success(req, res, currency, 201)
        }).catch(next);
});


module.exports = router