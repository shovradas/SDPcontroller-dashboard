
'use strict';

let da = require('../dataAccess.js');

// Basic CRUDs ===============================================================

exports.getAll = async () =>{
    let sql = "SELECT * FROM user";
    let result = await da.executeQuery(sql);
    return result;
}

exports.getAllByKey = async (key) =>{
    let keyStr = `%${key.toLowerCase()}%`;
    let sql = "SELECT * FROM user WHERE id=? OR lower(last_name) LIKE ? OR lower(first_name) LIKE ?";
    let result = await da.executeQuery(sql, [key, keyStr, keyStr]);
    return result;
}

exports.getById = async (id) =>{
    let sql = "SELECT * FROM user WHERE id=?";    
    let result = await da.executeQuery(sql, [id]);
    return result[0];
}

exports.insert = async (obj) =>{
    let sql = "INSERT INTO user(last_name, first_name, country, state, locality, org) VALUES(?,?,?,?,?,?)";    
    const {last_name, first_name, country, state, locality, org, id} = obj;
    let result = await da.executeQuery(sql, [last_name, first_name, country, state, locality, org, id]);
    return result.insertId;
}

exports.update = async (obj) =>{
    let sql = "UPDATE user SET last_name=?, first_name=? WHERE id=?";
    const {id, last_name, first_name} = obj;
    let result = await da.executeQuery(sql, [last_name, first_name, id]);
    return;
}

exports.delete = async (id) =>{
    let sql = "DELETE FROM user WHERE id=?";
    let result = await da.executeQuery(sql, [id]);
    return;
}

// Further CRUDs  ============================================================

exports.getByUsername = async (username) =>{
    let sql = "SELECT * FROM user u, user_credential uc WHERE u.id=uc.id AND username=?";
    let result = await da.executeQuery(sql, [username]); 
    return result[0];
}

exports.authenticate = async (username, password) =>{
    let sql = "SELECT id FROM user_credential WHERE username=? AND password=SHA2(?, 512)";
    let result = await da.executeQuery(sql, [username, password]); 
    return result.length == 1;
}