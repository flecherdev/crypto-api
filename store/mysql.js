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

const handleCon = () => {
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