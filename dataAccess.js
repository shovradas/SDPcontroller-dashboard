'use strict';

const mysql = require('mysql');
const bluebird = require('bluebird');
const config = require('./config.js');

const connection = mysql.createPool({
    connectionLimit: config.maxConnections,
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName    
});

connection.query = bluebird.promisify(connection.query);

exports.executeQuery = async (sql, params=[]) => {    
    let result = connection.query(sql, params);
    return result;
}