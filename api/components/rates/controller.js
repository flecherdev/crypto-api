const TABLA = 'rates'
const JOIN = 'currencies'

module.exports = function(injectStore) {
    let store = injectStore;

    if (!store) {
        store = require('../../../store/dummy')
    }

    // TODO List with join of currency
    function list(){ 
        return store.listRates(TABLA, JOIN)
    }

    function get(id){
        return store.get(TABLA, id);
    }

    function getBySymbol(symbol){
        return store.getBySymbol(TABLA, symbol);
    }

    function upsert(body){

        // created_at : new Date().toISOString()
        const rate = {
            id_currency : body.id_currency,
            value : body.value,
            created_at : new Date().toISOString()
        }

        return store.upsert(TABLA, rate)
    }

    return {
        list,
        get,
        upsert
    }
}