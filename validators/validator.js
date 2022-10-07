'use strict';

const Validator = require("fastest-validator");
const validator = new Validator();

const getErrorMessage = (results) => {
    let errorObj = {};
    results.forEach(item => {
        errorObj[item.field] = item;
        delete item.field;
    });
    console.log(errorObj);
    return errorObj;
}

exports.validate = (obj, targetName, schemaName) => {
    const schema = require(`./${targetName}Schema`);
    let results = validator.validate(obj, schema[schemaName]);
    if(results !== true){
        return getErrorMessage(results);
    }
    return true;
}