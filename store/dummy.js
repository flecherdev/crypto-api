const db = {
    currencies: [
        {
            id : 1,
            description: 'bitcoin',
            symbol: 'BTC'
        }, {
            id : 2,
            description : 'etherum',
            symbol: 'ETH'
        }, {
            id : 3,
            description: 'cardano',
            symbol: 'ADA'
        } 
    ],
    rates: [ 
        {
            id : 252,
            id_currency : 1,
            value : '11924.231233',
            created_at : '2020-09-01 16:23:02', 
            currency : {
                id : 1,
                description : 'bitcoin', 
                symbol : 'BTC'
            }
        }, {
            id : 250,
            id_currency : 2,
            value : '308.313553',
            created_at : '2020-09-01 16:13:51', 
            currency : {
                id : 2,
                description : 'etherum', 
                symbol : 'ETH'
            }
        }, {
            id : 255,
            id_currency : 3,
            value : '0.0990881',
            created_at : '2020-09-01 16:23:40', 
            currency : {
                id : 3,
                description : 'cardano', 
                symbol : 'ADA'
            }
        }
    ]
};

async function list(tabla) {
    return db[tabla];
}

async function get(tabla, id) {
    let col = await list(tabla);
    return col.filter(item => item.id === parseInt(id))[0] || null;
}

async function upsert(tabla, dato) {
    db[tabla].push(data)
}

async function remove(tabla, id) {
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove
}