const TABLA = 'rates'
const JOIN = 'currencies'

module.exports = function(injectStore) {
    let store = injectStore;

    if (!store) {
        store = require('../../../store/dummy')
    }

    function list(symbol, limit){ 
        return store.getRates(TABLA, JOIN, symbol, limit)
    }

    function getBySymbol(symbol){
        return store.getBySymbol(TABLA, symbol);
    }

    function upsert(body){
        const rate = {
            id_currency : body.id_currency,
            value : body.value,
            created_at : body.created_at
        }

        return store.upsert(TABLA, rate)
    }

    return {
        list,
        upsert,
        getBySymbol
    }
}