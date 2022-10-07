
'use strict';

const validator = require('../validators/validator');
const service = require('../services/sdpidService');
const util = require('../util');

const viewDir = 'sdpid';
const moduleRoute = '/sdpid';
const titleWord = 'SDP Component'

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

        let sort = req.query.sort ? req.query.sort.split('.') :  ['service_id', 'asc'];
        sort = {property: sort[0], order: sort[1]};
        // if(!['id', 'name', 'description', 'instance_count'].includes(sort.property) || !['asc', 'desc'].includes(sort.order))
        //     return res.redirect('/404');
        list = list.sort(util.compareByPropertyAndOrder(sort.property, sort.order));

        return res.render(`${viewDir}/list`, {
            title: `All ${titleWord}s`,
            moduleRoute: moduleRoute,
            message: message,
            page: page,
            limit: limit,
            totalCount: list.length,
            key: key,
            sort,
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

        return res.render(`${viewDir}/detail`, {
            title: `${titleWord} Detail`,
            moduleRoute: moduleRoute,
            message: message,
            obj: obj
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.createGet = async (req, res) => {
    try {
        let type = req.params.type;        

        return res.render(`${viewDir}/create`, {
            title: `Add New ${titleWord}`,
            moduleRoute: moduleRoute,
            type: type
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.createPost = async (req, res) => {
    try {
        let obj = req.body;

        let validationResult = validator.validate(obj, 'sdpid', 'create');
        if(validationResult !== true){
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

        let obj = await service.getById(id);

        return res.render(`${viewDir}/update`, {
            title: `Edit ${titleWord}`,
            moduleRoute: moduleRoute,
            obj: obj
        });
    } catch (e) {
        console.log(e.stack);
    }
}

exports.updatePost = async (req, res) => {
    try {
        let obj = req.body;
        obj.id = req.params.id;
        
        let validationResult = validator.validate(obj, 'sdpid', 'create');
        if(validationResult !== true){
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

exports.listByType = async (req, res) =>{
    let type = req.params.type;

    let key = req.query.key ? req.query.key : '';
    let list = key == '' ? await service.getAllByType(type) : await service.getAllByTypeAndKey(type, key);
    
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

    return res.render(`${viewDir}/list_by_type`, {
        title: `SDP ${util.capitalizeFirstLetter(type)}s`,
        moduleRoute: moduleRoute,
        pageRoute: `${moduleRoute}/type/${type}`,
        page: page,
        limit: limit,
        totalCount: list.length,
        key: key,
        sort,
        type: type,
        list: list.slice(start, end)
    });
}