'use strict';

let da = require('../dataAccess.js');

// Basic CRUDs ===============================================================
exports.getAll = async () =>{
    let sql = "SELECT * FROM sdpid";
    let result = await da.executeQuery(sql);
    return result;
}

exports.getAllByKey = async (key) =>{
    key = key.toLowerCase();
    let keyStr = `%${key}%`;
    let keyValid = key.startsWith("a") ? 1 : (key.startsWith("i")? 0 : -1);
    let keyUser = key.startsWith("una") ? '' : keyStr;
    let sql = `SELECT * FROM sdpid WHERE LOWER(type) LIKE ? OR 
                                         CAST(sdpid as CHAR) LIKE ? OR
                                         LOWER(country) LIKE ? OR 
                                         LOWER(state) LIKE ? OR 
                                         LOWER(locality) LIKE ? OR 
                                         LOWER(org) LIKE ? OR 
                                         LOWER(org_unit) LIKE ? OR
                                         valid=? OR
                                         COALESCE(CAST(user_id as CHAR), '') LIKE ?
              `;
    let result = await da.executeQuery(sql, [keyStr, keyStr, keyStr, keyStr, keyStr, keyStr, keyStr, keyValid, keyUser]);
    return result;
}

exports.getById = async (id) =>{
    let sql = "SELECT * FROM sdpid WHERE sdpid=?";  
    let result = await da.executeQuery(sql, [id]);
    return result[0];
}

exports.insert = async (obj) =>{
    let sql = "INSERT INTO sdpid(valid, type, country, state, locality, org) VALUES(?,?,?,?,?,?)";    
    const {valid, type, country, state, locality, org} = obj;
    let result = await da.executeQuery(sql, [valid, type, country, state, locality, org]);
    return result.insertId;
}

exports.update = async (obj) =>{
    let sql = "UPDATE sdpid SET valid=?, type=?, country=?, state=?, locality=?, org=? WHERE sdpid=?";
    const {valid, type, country, state, locality, org, id} = obj;
    let result = await da.executeQuery(sql, [valid, type, country, state, locality, org, id]);
    return;
}

exports.delete = async (id) =>{
    let sql = "DELETE FROM sdpid WHERE sdpid=?";    
    let result = await da.executeQuery(sql, [id]);
    console.log(id, result);
    return;
}


// Further CRUDs  ============================================================

exports.getAllByType = async (type) =>{
    let sql = "SELECT * FROM sdpid WHERE type LIKE ?";
    let result = await da.executeQuery(sql, [type]);
    return result;
}

exports.getAllValidByType = async (type) =>{
    let sql = "SELECT * FROM sdpid WHERE valid=1 AND type LIKE ?";
    let result = await da.executeQuery(sql, [type]);
    return result;
}

exports.getAllByTypeAndKey = async (type, key) =>{
    key = key.toLowerCase();
    let keyStr = `%${key}%`;
    let keyValid = key.startsWith("a") ? 1 : (key.startsWith("i")? 0 : -1);
    let keyUser = key.startsWith("una") ? '' : keyStr;
    let sql = `SELECT * FROM sdpid WHERE LOWER(type) LIKE ? AND (
                                         CAST(sdpid as CHAR) LIKE ? OR 
                                         LOWER(country) LIKE ? OR 
                                         LOWER(state) LIKE ? OR 
                                         LOWER(locality) LIKE ? OR 
                                         LOWER(org) LIKE ? OR 
                                         LOWER(org_unit) LIKE ? OR
                                         valid=? OR
                                         COALESCE(CAST(user_id as CHAR), '') LIKE ?
                                    )
              `;
    let result = await da.executeQuery(sql, [type, keyStr, keyStr, keyStr, keyStr, keyStr, keyStr, keyValid, keyUser]);
    return result;
}