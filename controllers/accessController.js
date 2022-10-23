'use strict';

const service = require('../services/accessService');
const serviceService = require('../services/serviceService');
const mqtttopicService = require('../services/mqtttopicService');
const validator = require('../validators/validator');

const viewDir = 'access';
const moduleRoute = '/access';

// service to client ==================================================================

exports.listServiceAccessToClient = async (req, res) => {
    try {
        let message = req.session.message;
        delete req.session.message;

        let accessListDict = await service.getAllServiceAccessToClient();        
        return res.render(`${viewDir}/service_client`, {
            title: `All Client Accesses to Services`,
            moduleRoute: moduleRoute,
            message,
            accessListDict
        });
    } catch (e) {
        console.log(e.stack);
    }    
}

exports.grantServiceAccessToClientGet = async (req, res) => {
    try {
        let service_id = req.params.service_id;

        let serviceObj = await serviceService.getById(service_id);
        let clientList = await service.getAllRevokedClientsFromServiceByServiceId(service_id);
        return res.render(`${viewDir}/service_client_grant`, {
            title: `Grant Service Access to Clients`,
            moduleRoute: moduleRoute,
            service: serviceObj,
            clientList
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.grantServiceAccessToClientPost = async (req, res) => {
    try {
        let obj = req.body;
        obj.sdpid_list = Array.isArray(obj.sdpid_list)? obj.sdpid_list: [obj.sdpid_list];

        let validationResult = validator.validate(obj, 'access', 'service_client_grant');
        if(validationResult !== true){
            let serviceObj = await serviceService.getById(obj.service_id);
            let clientList = await service.getAllRevokedClientsFromServiceByServiceId(obj.service_id);
            return res.render(`${viewDir}/service_client_grant`, {
                title: `Grant Service Access to Clients`,
                moduleRoute: moduleRoute,
                error: validationResult,
                obj,
                service: serviceObj,
                clientList
            });
        }

        // Need to ask Imran
        // obj.sdpid_list.forEach(async sdpid => {            
        //     await service.insertServiceAccessToClient({sdpid: sdpid, service_id: obj.service_id});
        // });

        for(const i in obj.sdpid_list){
            await service.insertServiceAccessToClient({sdpid: obj.sdpid_list[i], service_id: obj.service_id});
        }

        req.session.message = { status: 'success', text: 'Access granted successfully' };
        return res.redirect(`${moduleRoute}/service/client#headingServiceAccess${obj.service_id}`);
    } catch (e) {
        console.log(e.stack);
    }
}

exports.revokeServiceAccessFromClientGet = async (req, res) => {
    try {
        let id = req.params.id;
        let obj = await service.getServiceAccessToClientById(id);
        return res.render(`${viewDir}/service_client_revoke`, {
            title: `Revoke Service from Client`,
            moduleRoute: moduleRoute,
            obj
        });
    } catch (e) {
        console.log(e.stack);
    }    
}

exports.revokeServiceAccessFromClientPost = async (req, res) => {
    try {
        let id = req.params.id;
        let service_id = req.params.service_id;

        await service.deleteServiceAccessFromClient(id);

        req.session.message = { status: 'success', text: 'Deleted successfully' };
        return res.redirect(`${moduleRoute}/service/client#headingAccess${service_id}`);
    } catch (e) {
        console.log(e.stack);
    }    
}

// service to group ==================================================================

exports.listServiceAccessToGroup = async (req, res) => {
    try {
        let message = req.session.message;
        delete req.session.message;

        let accessListDict = await service.getAllServiceAccessToGroup();        
        return res.render(`${viewDir}/service_group`, {
            title: `All Group Accesses to Services`,
            moduleRoute: moduleRoute,
            message,
            accessListDict
        });
    } catch (e) {
        console.log(e.stack);
    }    
}

exports.grantServiceAccessToGroupGet = async (req, res) => {
    try {
        let service_id = req.params.service_id;

        let serviceObj = await serviceService.getById(service_id);
        let groupList = await service.getAllRevokedGroupsFromServiceByServiceId(service_id);
        return res.render(`${viewDir}/service_group_grant`, {
            title: `Grant Service Access to Groups`,
            moduleRoute: moduleRoute,
            service: serviceObj,
            groupList
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.grantServiceAccessToGroupPost = async (req, res) => {
    try {
        let obj = req.body;
        obj.group_list = Array.isArray(obj.group_list)? obj.group_list: [obj.group_list];

        let validationResult = validator.validate(obj, 'access', 'service_group_grant');
        if(validationResult !== true){
            let serviceObj = await serviceService.getById(obj.service_id);
            let groupList = await service.getAllRevokedGroupsFromServiceByServiceId(obj.service_id);
            return res.render(`${viewDir}/service_group_grant`, {
                title: `Grant Service Access to Groups`,
                moduleRoute: moduleRoute,
                error: validationResult,
                obj,
                service: serviceObj,
                groupList
            });
        }

        for(const i in obj.group_list){
            await service.insertServiceAccessToGroup({group_id: obj.group_list[i], service_id: obj.service_id});
        }

        req.session.message = { status: 'success', text: 'Access granted successfully' };
        return res.redirect(`${moduleRoute}/service/group#headingServiceAccess${obj.service_id}`);
    } catch (e) {
        console.log(e.stack);
    }
}

exports.revokeServiceAccessFromGroupGet = async (req, res) => {
    try {
        let id = req.params.id;
        let obj = await service.getServiceAccessToGroupById(id);
        return res.render(`${viewDir}/service_group_revoke`, {
            title: `Revoke Service from Group`,
            moduleRoute: moduleRoute,
            obj
        });
    } catch (e) {
        console.log(e.stack);
    }    
}

exports.revokeServiceAccessFromGroupPost = async (req, res) => {
    try {
        let id = req.params.id;
        let service_id = req.params.service_id;

        await service.deleteServiceAccessFromGroup(id);

        req.session.message = { status: 'success', text: 'Deleted successfully' };
        return res.redirect(`${moduleRoute}/service/group#headingAccess${service_id}`);
    } catch (e) {
        console.log(e.stack);
    }    
}

// mqtttopic to client ==================================================================

exports.listTopicAccessToClient = async (req, res) => {
    try {
        let message = req.session.message;
        delete req.session.message;

        let accessListDict = await service.getAllTopicAccessToClient();        
        return res.render(`${viewDir}/mqtttopic_client`, {
            title: `All Client Accesses to MQTT Topics`,
            moduleRoute: moduleRoute,
            message,
            accessListDict
        });
    } catch (e) {
        console.log(e.stack);
    }    
}

exports.grantTopicAccessToClientGet = async (req, res) => {
    try {
        let topic_id = req.params.topic_id;

        let topic = await mqtttopicService.getById(topic_id);
        let clientList = await service.getAllRevokedClientsFromTopicByTopicId(topic_id);
        return res.render(`${viewDir}/mqtttopic_client_grant`, {
            title: `Grant Topic Access to Clients`,
            moduleRoute: moduleRoute,
            topic: topic,
            clientList
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.grantTopicAccessToClientPost = async (req, res) => {
    try {
        let obj = req.body;
        obj.sdpid_list = Array.isArray(obj.sdpid_list)? obj.sdpid_list: [obj.sdpid_list];

        let validationResult = validator.validate(obj, 'access', 'topic_client_grant');
        if(validationResult !== true){
            let topic = await mqtttopicService.getById(obj.topic_id);
            let clientList = await service.getAllRevokedClientsFromTopicByTopicId(obj.topic_id);
            return res.render(`${viewDir}/mqtttopic_client_grant`, {
                title: `Grant Topic Access to Clients`,
                moduleRoute: moduleRoute,
                error: validationResult,
                obj,
                topic: topic,
                clientList
            });
        }

        for(const i in obj.sdpid_list){
            await service.insertTopicAccessToClient({sdpid: obj.sdpid_list[i], topic_id: obj.topic_id});
        }

        req.session.message = { status: 'success', text: 'Access granted successfully' };
        return res.redirect(`${moduleRoute}/mqtttopic/client#headingAccess${obj.topic_id}`);
    } catch (e) {
        console.log(e.stack);
    }
}

exports.revokeTopicAccessFromClientGet = async (req, res) => {
    try {
        let id = req.params.id;
        let obj = await service.getTopicAccessToClientById(id);
        return res.render(`${viewDir}/mqtttopic_client_revoke`, {
            title: `Revoke Topic from Client`,
            moduleRoute: moduleRoute,
            obj
        });
    } catch (e) {
        console.log(e.stack);
    }    
}

exports.revokeTopicAccessFromClientPost = async (req, res) => {
    try {
        let id = req.params.id;
        let topic_id = req.params.topic_id;

        await service.deleteTopicAccessFromClient(id);

        req.session.message = { status: 'success', text: 'Deleted successfully' };
        return res.redirect(`${moduleRoute}/mqtttopic/client#headingAccess${topic_id}`);
    } catch (e) {
        console.log(e.stack);
    }    
}

// mqtttopic to group ==================================================================

exports.listTopicAccessToGroup = async (req, res) => {
    try {
        let message = req.session.message;
        delete req.session.message;

        let accessListDict = await service.getAllTopicAccessToGroup();        
        return res.render(`${viewDir}/mqtttopic_group`, {
            title: `All Group Accesses to MQTT Topics`,
            moduleRoute: moduleRoute,
            message,
            accessListDict
        });
    } catch (e) {
        console.log(e.stack);
    }    
}

exports.grantTopicAccessToGroupGet = async (req, res) => {
    try {
        let topic_id = req.params.topic_id;

        let topic = await mqtttopicService.getById(topic_id);
        let groupList = await service.getAllRevokedGroupsFromTopicByTopicId(topic_id);
        return res.render(`${viewDir}/mqtttopic_group_grant`, {
            title: `Grant Topic Access to Groups`,
            moduleRoute: moduleRoute,
            topic: topic,
            groupList
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.grantTopicAccessToGroupPost = async (req, res) => {
    try {
        let obj = req.body;
        obj.group_list = Array.isArray(obj.group_list)? obj.group_list: [obj.group_list];

        let validationResult = validator.validate(obj, 'access', 'topic_group_grant');
        if(validationResult !== true){
            let topic = await mqtttopicService.getById(obj.topic_id);
            let groupList = await service.getAllRevokedGroupsFromTopicByTopicId(obj.topic_id);
            return res.render(`${viewDir}/mqtttopic_group_grant`, {
                title: `Grant Topic Access to Groups`,
                moduleRoute: moduleRoute,
                error: validationResult,
                obj,
                topic: topic,
                groupList
            });
        }

        for(const i in obj.group_list){
            await service.insertTopicAccessToGroup({group_id: obj.group_list[i], topic_id: obj.topic_id});
        }

        req.session.message = { status: 'success', text: 'Access granted successfully' };
        return res.redirect(`${moduleRoute}/mqtttopic/group#headingAccess${obj.topic_id}`);
    } catch (e) {
        console.log(e.stack);
    }
}

exports.revokeTopicAccessFromGroupGet = async (req, res) => {
    try {
        let id = req.params.id;
        let obj = await service.getTopicAccessToGroupById(id);
        return res.render(`${viewDir}/mqtttopic_group_revoke`, {
            title: `Revoke Topic from Group`,
            moduleRoute: moduleRoute,
            obj
        });
    } catch (e) {
        console.log(e.stack);
    }    
}

exports.revokeTopicAccessFromGroupPost = async (req, res) => {
    try {
        let id = req.params.id;
        let topic_id = req.params.topic_id;

        await service.deleteTopicAccessFromGroup(id);

        req.session.message = { status: 'success', text: 'Deleted successfully' };
        return res.redirect(`${moduleRoute}/mqtttopic/group#headingAccess${topic_id}`);
    } catch (e) {
        console.log(e.stack);
    }    
}


// mqtttopic to user ==================================================================

exports.listTopicAccessToUser = async (req, res) => {
    try {
        let message = req.session.message;
        delete req.session.message;

        let accessListDict = await service.getAllTopicAccessToUser();        
        return res.render(`${viewDir}/mqtttopic_user`, {
            title: `All User Accesses to MQTT Topics`,
            moduleRoute: moduleRoute,
            message,
            accessListDict
        });
    } catch (e) {
        console.log(e.stack);
    }    
}

exports.grantTopicAccessToUserGet = async (req, res) => {
    try {
        let topic_id = req.params.topic_id;

        let topic = await mqtttopicService.getById(topic_id);
        let userList = await service.getAllRevokedUsersFromTopicByTopicId(topic_id);
        return res.render(`${viewDir}/mqtttopic_user_grant`, {
            title: `Grant Topic Access to Users`,
            moduleRoute: moduleRoute,
            topic: topic,
            userList
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.grantTopicAccessToUserPost = async (req, res) => {
    try {
        let obj = req.body;        
        obj.user_list = Array.isArray(obj.user_list)? obj.user_list: [obj.user_list];

        let validationResult = validator.validate(obj, 'access', 'topic_user_grant');
        if(validationResult !== true){
            let topic = await mqtttopicService.getById(obj.topic_id);
            let userList = await service.getAllRevokedUsersFromTopicByTopicId(obj.topic_id);
            return res.render(`${viewDir}/mqtttopic_user_grant`, {
                title: `Grant Topic Access to Users`,
                moduleRoute: moduleRoute,
                error: validationResult,
                obj,
                topic: topic,
                userList
            });
        }

        for(const i in obj.user_list){
            await service.insertTopicAccessToUser({user_id: obj.user_list[i], topic_id: obj.topic_id, access: obj.access});
        }

        req.session.message = { status: 'success', text: 'Access granted successfully' };
        return res.redirect(`${moduleRoute}/mqtttopic/user#headingAccess${obj.topic_id}`);
    } catch (e) {
        console.log(e.stack);
    }
}

exports.revokeTopicAccessFromUserGet = async (req, res) => {
    try {
        let id = req.params.id;
        let obj = await service.getTopicAccessToUserById(id);
        return res.render(`${viewDir}/mqtttopic_user_revoke`, {
            title: `Revoke Topic from User`,
            moduleRoute: moduleRoute,
            obj
        });
    } catch (e) {
        console.log(e.stack);
    }    
}

exports.revokeTopicAccessFromUserPost = async (req, res) => {
    try {
        let id = req.params.id;
        let topic_id = req.params.topic_id;

        await service.deleteTopicAccessFromUser(id);

        req.session.message = { status: 'success', text: 'Deleted successfully' };
        return res.redirect(`${moduleRoute}/mqtttopic/user#headingAccess${topic_id}`);
    } catch (e) {
        console.log(e.stack);
    }    
}