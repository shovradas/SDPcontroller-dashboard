'use strict';

let da = require('../dataAccess.js');

// service to client ==================================================================

exports.getAllServiceAccessToClient = async () =>{
    let sql = `SELECT sss.id, sss.sdpid, sss.service_id, sss.name, sss.description,
               (SELECT COUNT(service_id) FROM service_gateway WHERE service_id=sss.service_id) AS 'instance_count',
               sdpid.country, sdpid.locality, sdpid.state
               FROM
               (
               SELECT ss.id, ss.sdpid, s.id AS service_id, s.name, s.description
               FROM sdpid_service ss
               RIGHT JOIN service s
               ON ss.service_id = s.id
               ) AS sss
               LEFT JOIN sdpid 
               ON sss.sdpid = sdpid.sdpid
               ORDER BY sss.service_id
    `;
    let result = await da.executeQuery(sql);

    let grouped = {};
    result.forEach(item=>{
        if(!grouped[item.service_id])
            grouped[item.service_id] = [];
        grouped[item.service_id].push(item);
    });
    return grouped;
}

exports.getAllRevokedClientsFromServiceByServiceId = async (service_id) =>{
    let sql = "SELECT * FROM sdpid WHERE type LIKE 'client' AND valid=1 AND sdpid NOT IN (SELECT sdpid FROM sdpid_service WHERE service_id=?)";
    let result = await da.executeQuery(sql, [service_id]);
    return result;
}

exports.getServiceAccessToClientById = async (id) =>{
    let sql = "SELECT ss.id, ss.service_id, service.name, ss.sdpid, sdpid.country, sdpid.state, sdpid.locality FROM sdpid_service ss, service, sdpid WHERE ss.id=? AND ss.service_id = service.id AND ss.sdpid = sdpid.sdpid;";
    let result = await da.executeQuery(sql, [id]);
    return result[0];
}

exports.insertServiceAccessToClient = async (obj) =>{
    let sql = "INSERT INTO sdpid_service(sdpid, service_id) VALUES(?,?)";    
    const {sdpid, service_id} = obj;
    let result = await da.executeQuery(sql, [sdpid, service_id]);
    return result.insertId;
}

exports.deleteServiceAccessFromClient = async (id) =>{
    let sql = "DELETE FROM sdpid_service WHERE id=?";
    let result = await da.executeQuery(sql, [id]);
    return result;
}


// service to group ==================================================================

exports.getAllServiceAccessToGroup = async () =>{
    let sql = `SELECT gss.id, gss.group_id, gss.service_id, gss.service_name, gss.service_description, 
               (SELECT COUNT(service_id) FROM service_gateway WHERE service_id=gss.service_id) AS 'instance_count',
               g.valid, g.name AS group_name, g.description AS group_description
               FROM
               (
               SELECT gs.id, gs.group_id, s.id AS service_id, s.name AS service_name, s.description AS service_description
               FROM group_service gs
               RIGHT JOIN service s
               ON gs.service_id = s.id
               ) AS gss
               LEFT JOIN \`group\` g
               ON gss.group_id = g.id
               ORDER BY gss.service_id
    `;
    let result = await da.executeQuery(sql);

    let grouped = {}; // not to be confused with group entity
    result.forEach(item=>{
        if(!grouped[item.service_id])
            grouped[item.service_id] = [];
        grouped[item.service_id].push(item);
    });
    return grouped;
}

exports.getAllRevokedGroupsFromServiceByServiceId = async (service_id) =>{
    let sql = "SELECT * FROM `group` WHERE valid=1 AND id NOT IN (SELECT group_id FROM group_service WHERE service_id=?)";
    let result = await da.executeQuery(sql, [service_id]);
    return result;
}

exports.getServiceAccessToGroupById = async (id) =>{
    let sql = "SELECT gs.id, gs.service_id, service.name AS 'service_name', service.description AS 'service_description', gs.group_id, `group`.valid, `group`.name AS 'group_name', `group`.description AS 'group_description' FROM group_service gs, service, `group` WHERE gs.id=? AND gs.service_id = service.id AND gs.group_id = `group`.id;";
    let result = await da.executeQuery(sql, [id]);
    return result[0];
}

exports.insertServiceAccessToGroup = async (obj) =>{
    let sql = "INSERT INTO group_service(group_id, service_id) VALUES(?,?)";    
    const {group_id, service_id} = obj;
    let result = await da.executeQuery(sql, [group_id, service_id]);
    return result.insertId;
}

exports.deleteServiceAccessFromGroup = async (id) =>{
    let sql = "DELETE FROM group_service WHERE id=?";
    let result = await da.executeQuery(sql, [id]);
    return result;
}


// mqtttopic to client ==================================================================

exports.getAllTopicAccessToClient = async () =>{
    let sql = `SELECT smm.id, smm.sdpid, smm.topic_id, smm.topic_name, smm.topic_description,
                sdpid.country, sdpid.locality, sdpid.state
                FROM
                (
                SELECT sm.id, sm.sdpid, m.id AS topic_id, m.name AS topic_name, m.description AS 'topic_description'
                FROM sdpid_mqtttopic sm
                RIGHT JOIN mqtttopic m
                ON sm.topic_id = m.id
                ) AS smm
                LEFT JOIN sdpid 
                ON smm.sdpid = sdpid.sdpid
                ORDER BY smm.topic_id
    `;
    let result = await da.executeQuery(sql);

    let grouped = {};
    result.forEach(item=>{
        if(!grouped[item.topic_id])
            grouped[item.topic_id] = [];
        grouped[item.topic_id].push(item);
    });
    return grouped;
}

exports.getAllRevokedClientsFromTopicByTopicId = async (topic_id) =>{
    let sql = "SELECT * FROM sdpid WHERE type LIKE 'client' AND valid=1 AND sdpid NOT IN (SELECT sdpid FROM sdpid_mqtttopic WHERE topic_id=?)";
    let result = await da.executeQuery(sql, [topic_id]);
    return result;
}

exports.getTopicAccessToClientById = async (id) =>{
    let sql = `
            SELECT sm.id, sm.topic_id, m.valid AS 'topic_valid', m.name AS 'topic_name', sm.sdpid, s.valid AS 'sdpid_valid', s.country, s.state, s.locality
            FROM sdpid_mqtttopic sm, mqtttopic m, sdpid s 
            WHERE sm.id=? AND sm.topic_id = m.id AND sm.sdpid = s.sdpid;
    `
    let result = await da.executeQuery(sql, [id]);
    return result[0];
}

exports.insertTopicAccessToClient = async (obj) =>{
    let sql = "INSERT INTO sdpid_mqtttopic(sdpid, topic_id) VALUES(?,?)";    
    const {sdpid, topic_id} = obj;
    let result = await da.executeQuery(sql, [sdpid, topic_id]);
    return result.insertId;
}

exports.deleteTopicAccessFromClient = async (id) =>{
    let sql = "DELETE FROM sdpid_mqtttopic WHERE id=?";
    let result = await da.executeQuery(sql, [id]);
    return result;
}


// mqtttopic to group ==================================================================

exports.getAllTopicAccessToGroup = async () =>{
    let sql = `SELECT gmm.id, gmm.group_id, gmm.topic_id, gmm.topic_valid, gmm.topic_name, gmm.topic_description,
                g.valid AS 'group_valid', g.name AS 'group_name', g.description AS 'group_description', gmm.access
                FROM
                (
                SELECT gm.id, gm.group_id, gm.access, m.id AS topic_id, m.valid AS 'topic_valid', m.name AS topic_name, m.description AS 'topic_description'
                FROM group_mqtttopic gm
                RIGHT JOIN mqtttopic m
                ON gm.topic_id = m.id
                ) AS gmm
                LEFT JOIN \`group\` g 
                ON gmm.group_id = g.id
                ORDER BY gmm.topic_id
    `;
    let result = await da.executeQuery(sql);

    let grouped = {}; // not to be confused with group entity
    result.forEach(item=>{
        if(!grouped[item.topic_id])
            grouped[item.topic_id] = [];
        grouped[item.topic_id].push(item);
    });
    return grouped;
}

exports.getAllRevokedGroupsFromTopicByTopicId = async (topic_id) =>{
    let sql = "SELECT * FROM `group` WHERE valid=1 AND id NOT IN (SELECT group_id FROM group_mqtttopic WHERE topic_id=?)";
    let result = await da.executeQuery(sql, [topic_id]);
    return result;
}

exports.getTopicAccessToGroupById = async (id) =>{
    let sql = `
        SELECT gm.id, gm.topic_id, m.valid AS 'topic_valid', m.name AS 'topic_name', gm.group_id, g.valid AS 'group_valid', g.name AS 'group_name'
        FROM group_mqtttopic gm, mqtttopic m, \`group\` g 
        WHERE gm.id=? AND gm.topic_id = m.id AND gm.group_id = g.id;
    `;
    let result = await da.executeQuery(sql, [id]);
    return result[0];
}

exports.insertTopicAccessToGroup = async (obj) =>{
    let sql = "INSERT INTO group_mqtttopic(group_id, topic_id) VALUES(?,?)";    
    const {group_id, topic_id} = obj;
    let result = await da.executeQuery(sql, [group_id, topic_id]);
    return result.insertId;
}

exports.deleteTopicAccessFromGroup = async (id) =>{
    let sql = "DELETE FROM group_mqtttopic WHERE id=?";
    let result = await da.executeQuery(sql, [id]);
    return result;
}


// mqtttopic to user ==================================================================

exports.getAllTopicAccessToUser = async () =>{
    let sql = `
        SELECT umm.id, umm.user_id, umm.topic_id, umm.topic_valid, umm.topic_name, umm.topic_description,
        u.last_name, u.first_name, umm.access
        FROM
        (
        SELECT um.id, um.user_id, um.access, m.id AS topic_id, m.valid AS 'topic_valid', m.name AS topic_name, m.description AS 'topic_description'
        FROM user_mqtttopic um
        RIGHT JOIN mqtttopic m
        ON um.topic_id = m.id
        ) AS umm
        LEFT JOIN \`user\` u 
        ON umm.user_id = u.id
        ORDER BY umm.topic_id
    `;
    let result = await da.executeQuery(sql);

    let grouped = {}; // not to be confused with group entity
    result.forEach(item=>{
        if(!grouped[item.topic_id])
            grouped[item.topic_id] = [];
        grouped[item.topic_id].push(item);
    });
    return grouped;
}

exports.getAllRevokedUsersFromTopicByTopicId = async (topic_id) =>{
    let sql = "SELECT * FROM user WHERE id NOT IN (SELECT user_id FROM user_mqtttopic WHERE topic_id=?)";
    let result = await da.executeQuery(sql, [topic_id]);
    return result;
}

exports.getTopicAccessToUserById = async (id) =>{
    let sql = `
            SELECT um.id, um.topic_id, m.valid AS 'topic_valid', m.name AS 'topic_name', um.user_id, u.last_name, u.first_name
            FROM user_mqtttopic um, mqtttopic m, user u 
            WHERE um.id=? AND um.topic_id = m.id AND um.user_id = u.id;
    `;
    let result = await da.executeQuery(sql, [id]);
    return result[0];
}

exports.insertTopicAccessToUser = async (obj) =>{
    let sql = "INSERT INTO user_mqtttopic(user_id, topic_id, access) VALUES(?,?,?)";    
    const {user_id, topic_id, access} = obj;
    let result = await da.executeQuery(sql, [user_id, topic_id, access]);
    return result.insertId;
}

exports.deleteTopicAccessFromUser = async (id) =>{
    let sql = "DELETE FROM user_mqtttopic WHERE id=?";
    let result = await da.executeQuery(sql, [id]);
    return result;
}

