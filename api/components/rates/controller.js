const TABLA = 'rates'

module.exports = function(injectStore) {
    let store = injectStore;

    if (!store) {
        store = require('../../../store/dummy')
    }

    // TODO LISTAS POR MEDIO DE QUERY
    function list(){ 
        return store.list(TABLA)
    }

    function get(id){
        return store.get(TABLA, id);
    }

    function upsert(body){

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