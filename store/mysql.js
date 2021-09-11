const { json } = require('express');
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
        connection.query(`select * from ${dbConf.database}.${tabla} where id=${id}`, (err, data) => {
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

function getBySymbol(tabla, data) {
    return new Promise((resolve, reject) => {
        connection.query(`select * from ${dbConf.database}.${tabla} where symbol=${symbol}`)
    })
}

function query(tabla, query, join) {

}

module.exports = { 
    list,
    get,
    upsert,
}