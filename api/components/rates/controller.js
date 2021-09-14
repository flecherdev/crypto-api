const TABLA = 'rates'
const JOIN = 'currencies'

module.exports = function(injectStore) {
    let store = injectStore;

    if (!store) {
        store = require('../../../store/dummy')
    }

    function list(symbol){ 
        console.log(symbol)
        return store.getRates(TABLA, JOIN, symbol)
    }

    function getBySymbol(symbol){
        return store.getBySymbol(TABLA, symbol);
    }

    function upsert(body){
        const rate = {
            id_currency : body.id_currency,
            value : body.value,
            created_at : new Date()
        }

        return store.upsert(TABLA, rate)
    }

    return {
        list,
        upsert
    }
}