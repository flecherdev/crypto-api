// const store = require('../../../store/mysql');
const nanoid = require('nanoid')

const TABLA = 'currencies'

module.exports = function(injectStore) {
    let store = injectStore;

    if (!store) {
        store = require('../../../store/dummy')
    }

    function list(){
        return store.list(TABLA)
    }

    function get(id){
        return store.get(TABLA, id);
    }

    function upsert(body){
        const currency = {
            description: body.description,
            symbol: body.symbol
        }

        return store.upsert(TABLA, currency)
    }

    return {
        list,
        get,
        upsert
    }
}