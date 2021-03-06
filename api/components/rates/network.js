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
// router.get('/:symbol', (req, res, next) => {
//     console.log(req.params.symbol)
//     controller.list(req.params.symbol)
//         .then( (currency) => {
//             response.success(req, res, currency, 200)
//         }).catch(next);
// });

router.get('/:symbol/:limit?', (req, res, next) => {
    console.log(req.params.symbol)
    console.log(req.params.limit)

    controller.list(req.params.symbol, req.params.limit)
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