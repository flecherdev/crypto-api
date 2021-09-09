const express = require('express');
const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router();

router.get('/', (req, res, next) => {
    controller.list()
        .then( (list) => {
            response.success(req, res, list, 200)
        }).catch(next);
});

router.get('/:id', (req, res, next) => {
    controller.get(req.params.id)
        .then( (currency) => {
            response.success(req, res, currency, 200)
        }).catch(next);
});

router.post('/', (req, res, next) => {
    controller.upsert(req.body)
        .then( (currency) => {
            response.success(req, res, currency, 201)
        }).catch(next);
});



module.exports = router