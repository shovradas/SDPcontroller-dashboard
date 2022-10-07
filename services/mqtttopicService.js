
'use strict';

let da = require('../dataAccess.js');

// Basic CRUDs ===============================================================

exports.getAll = async () =>{
    let sql = "SELECT * FROM mqtttopic";
    let result = await da.executeQuery(sql);
    return result;
}

exports.getAllByKey = async (key) =>{
    key = key.toLowerCase();
    let keyStr = `%${key}%`;
    let keyValid = key.startsWith("a") ? 1 : (key.startsWith("i")? 0 : -1);
    let sql = "SELECT * FROM mqtttopic WHERE CAST(id as CHAR) LIKE ? OR LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR valid=?";
    let result = await da.executeQuery(sql, [keyStr, keyStr, keyStr, keyValid]);
    return result;
}

exports.getById = async (id) =>{
    let sql = "SELECT * FROM mqtttopic WHERE id=?";
    let result = await da.executeQuery(sql, [id]);
    return result[0];
}

exports.insert = async (obj) =>{
    let sql = "INSERT INTO mqtttopic(valid, name, description) VALUES(?,?,?)";    
    const {valid, name, description} = obj;
    let result = await da.executeQuery(sql, [valid, name, description]);
    return result.insertId;
}

exports.update = async (obj) =>{
    let sql = "UPDATE mqtttopic SET valid=?, name=?, description=? WHERE id=?";
    const {valid, name, description, id} = obj;
    let result = await da.executeQuery(sql, [valid, name, description, id]);
    return;
}

exports.delete = async (id) =>{
    let sql = "DELETE FROM mqtttopic WHERE id=?";
    let result = await da.executeQuery(sql, [id]);
    return;
}

// Further CRUDs  ============================================================