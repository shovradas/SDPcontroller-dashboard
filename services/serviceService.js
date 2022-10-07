'use strict';

let da = require('../dataAccess.js');

// Basic CRUDs ===============================================================

exports.getAll = async () =>{
    let sql = "SELECT *, (SELECT COUNT(service_id) FROM service_gateway WHERE service_id=service.id) AS 'instance_count' FROM service";
    let result = await da.executeQuery(sql);
    return result;
}

exports.getAllByKey = async (key) =>{
    let keyStr = `%${key.toLowerCase()}%`;
    let sql = "SELECT *, (SELECT COUNT(service_id) FROM service_gateway WHERE service_id=service.id) AS 'instance_count' FROM service WHERE CAST(id as CHAR) LIKE ? OR LOWER(name) LIKE ? OR LOWER(description) LIKE ?";
    let result = await da.executeQuery(sql, [keyStr, keyStr, keyStr]);
    return result;
}

exports.getById = async (id) =>{
    let sql = "SELECT *, (SELECT COUNT(service_id) FROM service_gateway WHERE service_id=?) AS 'instance_count' FROM service WHERE id=?";    
    let result = await da.executeQuery(sql, [id, id]);
    return result[0];
}

exports.insert = async (obj) =>{
    let sql = "INSERT INTO service(name, description) VALUES(?,?)";    
    const {name, description} = obj;
    let result = await da.executeQuery(sql, [name, description]);
    return result.insertId;
}

exports.update = async (obj) =>{
    let sql = "UPDATE service SET name=?, description=? WHERE id=?";
    const {name, description, id} = obj;
    let result = await da.executeQuery(sql, [name, description, id]);
    return;
}

exports.delete = async (id) =>{
    let sql = "DELETE FROM service WHERE id=?";
    let result = await da.executeQuery(sql, [id]);
    return;
}

// Further CRUDs  ============================================================

exports.getAllInstances = async () =>{
    let sql = "SELECT *, (SELECT name FROM service WHERE id=service_id) AS 'name' FROM service_gateway ORDER BY service_id";
    let result = await da.executeQuery(sql);
    console.log(result);
    return result;
}

exports.getAllInstancesByKey = async (key) =>{
    key = `%${key.toLowerCase()}%`;
    let sql = `SELECT * FROM service_gateway WHERE CAST(service_id as CHAR) LIKE ? OR 
                                                   CAST(gateway_sdpid as CHAR) LIKE ? OR 
                                                   LOWER(protocol) LIKE ? OR
                                                   CAST(port as CHAR) LIKE ? OR
                                                   nat_ip LIKE ? OR
                                                   CAST(nat_port as CHAR) LIKE ?
                                             ORDER BY service_id
              `;
    let result = await da.executeQuery(sql, [key, key, key, key, key, key]);
    return result;
}

exports.getAllInstancesByServiceId = async (service_id) =>{
    let sql = "SELECT * FROM service_gateway WHERE service_id=?";
    let result = await da.executeQuery(sql, [service_id]);
    return result;
}

exports.getInstanceById = async (id) =>{
    let sql = "SELECT * FROM service_gateway WHERE id=?";
    let result = await da.executeQuery(sql, [id]);
    return result[0];
}

exports.insertInstance = async (obj) =>{
    let sql = "INSERT INTO service_gateway(service_id, gateway_sdpid, protocol, port, nat_ip, nat_port) VALUES(?,?,?,?,?,?)";    
    const {service_id, gateway_sdpid, protocol, port, nat_ip, nat_port} = obj;
    let result = await da.executeQuery(sql, [service_id, gateway_sdpid, protocol, port, nat_ip, nat_port]);
    return result.insertId;
}

exports.updateInstance = async (obj) =>{
    let sql = "UPDATE service_gateway SET service_id=?, gateway_sdpid=?, protocol=?, port=?, nat_ip=?, nat_port=? WHERE id=?";    
    const {service_id, gateway_sdpid, protocol, port, nat_ip, nat_port, id} = obj;
    let result = await da.executeQuery(sql, [service_id, gateway_sdpid, protocol, port, nat_ip, nat_port, id]);
    return result.insertId;
}

exports.deleteInstance = async (id) =>{
    let sql = "DELETE FROM service_gateway WHERE id=?";
    let result = await da.executeQuery(sql, [id]);
    return;
}