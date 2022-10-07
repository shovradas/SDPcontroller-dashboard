'use strict';

const validator = require('../validators/validator');
const service = require('../services/serviceService');
const sdpidService = require('../services/sdpidService');
const util = require('../util');

const viewDir = 'service';
const moduleRoute = '/service';
const titleWord = 'Service'

// Basic Actions  ============================================================

exports.list = async (req, res) => {
    try {
        let message = req.session.message;
        delete req.session.message;

        let key = req.query.key ? req.query.key : '';
        let list = key == '' ? await service.getAll() : await service.getAllByKey(key);
            
        let defaultLimit = 10;
        let page = req.query.page ? parseInt(req.query.page) : 1;
        let limit = req.query.limit ? parseInt(req.query.limit) : defaultLimit;
        if (validator.validate({page, limit}, 'misc', 'pagination') !== true)
            return res.redirect('/404');
        limit = limit < defaultLimit? defaultLimit: limit;
        let totalCount = list.length;
        if(totalCount < limit){
            limit = totalCount;
            page = 1;
        }
        let start = (page - 1) * limit;
        let end = page * limit;
        
        
        let sort = req.query.sort ? req.query.sort.split('.') :  ['id', 'asc'];
        sort = {property: sort[0], order: sort[1]};
        if(!['id', 'name', 'description', 'instance_count'].includes(sort.property) || !['asc', 'desc'].includes(sort.order))
            return res.redirect('/404');        
        list = list.sort(util.compareByPropertyAndOrder(sort.property, sort.order));


        return res.render(`${viewDir}/list`, {
            title: `All ${titleWord}s`,
            moduleRoute: moduleRoute,
            message: message,
            page: page,
            limit: limit,
            totalCount: totalCount,
            key: key,
            sort: sort,
            list: list.slice(start, end)
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.detail = async (req, res) => {
    try {
        let id = req.params.id;
        let message = req.session.message;
        delete req.session.message;

        let obj = await service.getById(id);
        let instanceList = await service.getAllInstancesByServiceId(id);

        return res.render(`${viewDir}/detail`, {
            title: `${titleWord} Detail`,
            moduleRoute: moduleRoute,
            message: message,
            obj: obj,
            instanceList: instanceList           
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.createGet = async (req, res) => {
    try {
        return res.render(`${viewDir}/create`, {
            title: `Add New ${titleWord}`,
            moduleRoute: moduleRoute
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.createPost = async (req, res) => {
    try {
        let obj = req.body;

        let validationResult = validator.validate(obj, 'service', 'create');
        if (validationResult !== true) {
            return res.render(`${viewDir}/create`, {
                title: `Add New ${titleWord}`,
                moduleRoute: moduleRoute,
                obj,
                error: validationResult
            });
        }

        let newId = await service.insert(obj);

        req.session.message = { status: 'success', text: 'Added successfully' };
        return res.redirect(`${moduleRoute}/${newId}`);
    } catch (e) {
        console.log(e.stack);
    }
}

exports.updateGet = async (req, res) => {
    try {
        let id = req.params.id;

        let message = req.session.message;
        delete req.session.message;

        let obj = await service.getById(id);
        let instanceList = await service.getAllInstancesByServiceId(id);

        return res.render(`${viewDir}/update`, {
            title: `Edit ${titleWord}`,
            moduleRoute: moduleRoute,
            message,
            obj: obj,
            id: id,
            instanceList: instanceList
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.updatePost = async (req, res) => {
    try {
        let obj = req.body;
        obj.id = req.params.id;

        let validationResult = validator.validate(obj, 'service', 'create');
        if (validationResult !== true) {
            return res.render(`${viewDir}/update`, {
                title: `Edit ${titleWord}`,
                moduleRoute: moduleRoute,
                obj,
                error: validationResult
            });
        }

        await service.update(obj);

        req.session.message = { status: 'success', text: 'Updated successfully' };
        return res.redirect(`${moduleRoute}/${obj.id}`);
    } catch (e) {
        console.log(e.stack);
    }
}

exports.deleteGet = async (req, res) => {
    try {
        let id = req.params.id;

        let obj = await service.getById(id);

        return res.render(`${viewDir}/delete`, {
            title: `Delete ${titleWord}`,
            moduleRoute: moduleRoute,
            obj: obj,
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.deletePost = async (req, res) => {
    try {
        let id = req.params.id;

        await service.delete(id);

        req.session.message = { status: 'success', text: 'Deleted successfully' };
        return res.redirect(moduleRoute);
    } catch (e) {
        console.log(e.stack);
    }
}

// Further Actions  ==========================================================

exports.listInstance = async (req, res) => {
    try {
        let message = req.session.message;
        delete req.session.message;

        let key = req.query.key ? req.query.key : '';
        let list = key == '' ? await service.getAllInstances() : await service.getAllInstancesByKey(key);

        let defaultLimit = 10;
        let page = req.query.page ? parseInt(req.query.page) : 1;
        let limit = req.query.limit ? parseInt(req.query.limit) : defaultLimit;
        if (validator.validate({page, limit}, 'misc', 'pagination') !== true)
            return res.redirect('/404');
        limit = limit < defaultLimit? defaultLimit: limit;
        let totalCount = list.length;
        if(totalCount < limit){
            limit = totalCount;
            page = 1;
        }
        let start = (page - 1) * limit;
        let end = page * limit;

        let sort = req.query.sort ? req.query.sort.split('.') :  ['service_id', 'asc'];
        sort = {property: sort[0], order: sort[1]};
        // if(!['id', 'name', 'description', 'instance_count'].includes(sort.property) || !['asc', 'desc'].includes(sort.order))
        //     return res.redirect('/404');
        list = list.sort(util.compareByPropertyAndOrder(sort.property, sort.order));
        
        return res.render(`${viewDir}/instance_list`, {
            title: `All ${titleWord} Instances`,
            moduleRoute: moduleRoute,
            pageRoute: `${moduleRoute}/all/instance`,
            message: message,
            page: page,
            limit: limit,
            totalCount: totalCount,
            key: key,
            sort: sort,
            list: list.slice(start, end)
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.createInstanceGet = async (req, res) => {
    try {
        let service_id = req.params.service_id;
        let obj = {service_id: service_id};
        let serviceList = await service.getAll();
        let gatewayList = await sdpidService.getAllValidByType('gateway');
        return res.render(`${viewDir}/instance_create`, {
            title: `Add New ${titleWord} Instance`,
            moduleRoute: moduleRoute,
            obj: obj,
            serviceList,
            gatewayList: gatewayList
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.createInstancePost = async (req, res) => {
    try {
        let obj = req.body;
        obj.service_id = parseInt(obj.service_id);
        obj.gateway_sdpid = parseInt(obj.gateway_sdpid);
        obj.port = parseInt(obj.port);
        obj.nat_port = obj.nat_port? parseInt(obj.nat_port): 0;
        // TOCHECK: what happens in fwknop if nat_port available but not nat_ip
        obj.nat_port = obj.nat_ip && !obj.nat_port? obj.port: obj.nat_port;

        let validationResult = validator.validate(obj, 'service', 'instance_create');
        if (validationResult !== true) {
            let serviceList = await service.getAll();
            let gatewayList = await sdpidService.getAllValidByType('gateway');            
            return res.render(`${viewDir}/instance_create`, {
                title: `Add New ${titleWord} Instance`,
                moduleRoute: moduleRoute,
                obj,
                error: validationResult,
                serviceList,
                gatewayList: gatewayList
            });
        }

        await service.insertInstance(obj);

        req.session.message = { status: 'success', text: 'New Instance added successfully' };
        return res.redirect(`${moduleRoute}/${obj.service_id}/update`);
    } catch (e) {
        console.log(e.stack);
    }
}

exports.updateInstanceGet = async (req, res) => {    
    try {       
        let id = req.params.id;
        
        let obj = await service.getInstanceById(id);

        let serviceObj = await service.getById(obj.service_id);
        let gatewayList = await sdpidService.getAllValidByType('gateway');

        return res.render(`${viewDir}/instance_update`, {
            title: `Edit ${titleWord} Instance`,
            moduleRoute: moduleRoute,
            obj: obj,
            service: serviceObj,
            gatewayList: gatewayList
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.updateInstancePost = async (req, res) => {
    try {
        let obj = req.body;
        obj.id = parseInt(req.params.id);
        obj.service_id = parseInt(obj.service_id);
        obj.gateway_sdpid = parseInt(obj.gateway_sdpid);
        obj.port = parseInt(obj.port);
        obj.nat_port = obj.nat_port? parseInt(obj.nat_port): 0;
        obj.nat_port = obj.nat_ip && !obj.nat_port? obj.port: obj.nat_port;

        let validationResult = validator.validate(obj, 'service', 'instance_update');
        if (validationResult !== true) {
            let serviceObj = await service.getById(obj.service_id);
            let gatewayList = await sdpidService.getAllValidByType('gateway');            
            return res.render(`${viewDir}/instance_update`, {
                title: `Edit ${titleWord} Instance`,
                moduleRoute: moduleRoute,                
                obj: obj,
                error: validationResult,
                service: serviceObj,
                gatewayList: gatewayList
            });
        }

        await service.updateInstance(obj);

        req.session.message = { status: 'success', text: 'Updated successfully' };
        return res.redirect(`${moduleRoute}/${obj.service_id}/update`);
    } catch (e) {
        console.log(e.stack);
    }
}


exports.deleteInstanceGet = async (req, res) => {
    try {
        let id = req.params.id;

        let obj = await service.getInstanceById(id);

        return res.render(`${viewDir}/instance_delete`, {
            title: `Delete ${titleWord} Instance`,
            moduleRoute: moduleRoute,
            obj: obj,
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.deleteInstancePost = async (req, res) => {
    try {
        let id = req.params.id;
        let service_id = req.body.service_id;

        await service.deleteInstance(id);

        req.session.message = { status: 'success', text: 'Deleted successfully' };
        return res.redirect(`${moduleRoute}/${service_id}/update`);
    } catch (e) {
        console.log(e.stack);
    }
}