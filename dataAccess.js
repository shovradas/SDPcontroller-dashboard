'use strict';

const mysql = require('mysql');
const bluebird = require('bluebird');

const connection = mysql.createPool({
    host: "localhost",
    user: "sdp_controller",
    password: "password",
    database: "sdp",
    connectionLimit: 100
});

connection.query = bluebird.promisify(connection.query);

exports.executeQuery = async (sql, params=[]) => {    
    let result = connection.query(sql, params);
    return result;
}