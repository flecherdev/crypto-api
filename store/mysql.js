const mysql = require('mysql');

const config = require('../config');

const dbConf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    pool: {
        max: config.mysql.pool.max,
        min: config.mysql.pool.min,
        acquire: config.mysql.pool.acquire,
        idle: config.mysql.pool.idle
    }
}

// connection db
let connection;

function handleCon(){
    connection = mysql.createConnection(dbConf);
    connection.connect( (err) => {
        if (err) {
            console.log(`[db error connection] ${err}`);
            setTimeout(handleCon, 2000);
        } else{
            console.log(`DB CONNECTED`)
        }
    })

    connection.on('error', err => {
        console.log(`[db error connection] ${err}`);
        if( err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

// list
function list(tabla) {
    return new Promise((resolve, reject) => {
        connection.query(`select * from ${dbConf.database}.${tabla}`, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
}

function get(tabla, id) {
    return new Promise((resolve, reject) => {
        connection.query(`select * from ${dbConf.database}.${tabla} where id=?`,id, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
}

function insert(tabla, data) {
    return new Promise((resolve, reject) => {
        connection.query(`insert into ${dbConf.database}.${tabla} set ?`, data, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

function update(tabla, data) {
    return new Promise((resolve, reject) => {
        connection.query(`update ${dbConf.database}.${tabla} set ? where id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

function upsert(tabla, data) {
    return data && data.id ? update(table, data) : insert(tabla,data);
}

function getRates(tabla, join , symbol, limit) {

    // SQL INJECTIONS
    // let symbolWhere = symbol ? `where ${dbConf.database}.${join}.symbol = '${symbol})'` : ''; 
    // let oderBy = `order by abs( datediff(${dbConf.database}.${tabla}.created_at , now())) limit ${limit ? limit : '1'}`
    // let query = `select * from ${dbConf.database}.${tabla}
    //                 inner join ${dbConf.database}.${join}
    //                 on ${dbConf.database}.${join}.id = ${dbConf.database}.${tabla}.id_currency
    //                 ${symbolWhere ? symbolWhere : ''}
    //                 ${symbolWhere ? oderBy : ''};`

    //WITHOUT SQL INJECTIONS 
    let select =  mysql.format("select * from ? inner join ?", [mysql.raw(`${dbConf.database}.${tabla}`), mysql.raw(`${dbConf.database}.${join}`)])
    let on =  mysql.format("on ? = ?", [mysql.raw(`${dbConf.database}.${join}.id`), mysql.raw(`${dbConf.database}.${tabla}.id_currency`)])
    let where = symbol ? mysql.format("where ?.symbol = ?", [mysql.raw(`${dbConf.database}.${join}`), mysql.raw(mysql.escape(`${symbol}`))]) : ''
    let orderBy = where ? mysql.format( `order by abs( datediff(?, now())) limit ?`, [mysql.raw(`${dbConf.database}.${tabla}.created_at`),  mysql.raw(` ${limit ? limit : '1'}`) ]) : ''

    let query = `${select} ${on} ${where} ${orderBy}`

    console.log(query)

    return new Promise((resolve, reject) => {
        connection.query(query, (err, data) => {
            if (err) return reject(err);
            console.log(data)
            let result = []
            data.map( data => {
                result.push( {
                    id: data.id,
                    id_currency: data.id_currency,
                    value: data.value,
                    created_at: data.created_at, 
                    currency: {
                        id: data.id_currency,
                        description: data.description, 
                        symbol: data.symbol
                    }
                })

            })
            return resolve( data.length > 1 ? result : result[0]);
        });
    })
}

function query(tabla, query, join) {

}

module.exports = { 
    list,
    get,
    upsert,
    getRates,
}