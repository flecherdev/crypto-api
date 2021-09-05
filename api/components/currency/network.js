const express = require('express');
const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router();

router.get('/', (req, res) => {
    controller.list()
        .then( (list) => {
            response.success(req, res, list, 200)
        }).catch( error => {
            response.error(req, res, error.message, 500)
        });
});

router.get('/:id', (req, res) => {
    controller.get(req.params.id)
        .then( (currency) => {
            response.success(req, res, currency, 200)
        }).catch( error => {
            response.error(req, res, error.message, 500)
        });
});

router.post('/', (req, res) => {
    Controller.upsert(req.body)
        .then( (currency) => {
            response.success(req, res, currency, 201)
        }).catch( error => {
            response.error(req, res, error.message, 500)
        });
});

module.exports = router