'use strict';

module.exports = {
    create: {
        valid: {type: "enum", values: ["0", "1"]},
        type: {type: "enum", values: ["client", "gateway", "controller"]},
        country: {type: "string", empty: false, length: 2},
        state: {type: "string", empty: false, max:128},
        locality: {type: "string", empty: false, max:128},
        org: {type: "string", empty: false, max:128}
    },
    update: {
        id: {type: "number", positive: true, convert: true},
        valid: {type: "enum", values: ["0", "1"]},
        type: {type: "enum", values: ["client", "gateway", "controller"]},
        country: {type: "string", empty: false, length: 2},
        state: {type: "string", empty: false, max:128},
        locality: {type: "string", empty: false, max:128},
        org: {type: "string", empty: false, max:128}
    },
    gencred: {
        sdpid: {type: "number", positive: true, convert: true}        
    } 
};

