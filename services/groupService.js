
'use strict';

let da = require('../dataAccess.js');

// Basic CRUDs ===============================================================

exports.getAll = async () =>{
    let sql = "SELECT * FROM `group`";
    let result = await da.executeQuery(sql);
    return result;
}

exports.getAllByKey = async (key) =>{
    let keyStr = `%${key.toLowerCase()}%`;
    let keyValid = key.toLowerCase().startsWith("a") ? 1 : (key.toLowerCase().startsWith("i")? 0 : -1);
    let sql = "SELECT * FROM `group` WHERE id=? OR lower(name) LIKE ? OR lower(description) LIKE ? OR valid=?";
    let result = await da.executeQuery(sql, [key, keyStr, keyStr, keyValid]);
    return result;
}

exports.getById = async (id) =>{
    let sql = "SELECT * FROM `group` WHERE id=?";
    let result = await da.executeQuery(sql, [id]);
    return result[0];
}

exports.insert = async (obj) =>{
    let sql = "INSERT INTO `group`(valid, name, description) VALUES(?,?,?)";    
    const {valid, name, description} = obj;
    let result = await da.executeQuery(sql, [valid, name, description]);
    return result.insertId;
}

exports.update = async (obj) =>{
    let sql = "UPDATE `group` SET valid=?, name=?, description=? WHERE id=?";
    const {valid, name, description, id} = obj;
    let result = await da.executeQuery(sql, [valid, name, description, id]);
    return;
}

exports.delete = async (id) =>{
    let sql = "DELETE FROM `group` WHERE id=?";
    let result = await da.executeQuery(sql, [id]);
    return;
}

// Further CRUDs  ============================================================