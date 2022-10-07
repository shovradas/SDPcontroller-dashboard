'use strict';

module.exports = {
    create: {
        name: {type: "string", empty: false},
        description: {type: "string", empty: false}
    },
    update: {
        id: {type: "number", positive: true},
        name: {type: "string", empty: false},
        description: {type: "string", empty: false}
    },
    instance_create: {
        service_id: {type: "number", empty: false},
        gateway_sdpid: {type: "number", empty: false},
        protocol: {type: "enum", values: ["TCP", "UDP"]},
        port: {type: "number", empty: false},
        nat_ip: {type: "string", empty: true},
        nat_port: {type: "number", empty: true}
    }, 
    instance_update: {
        id: {type: "number", empty: false},
        service_id: {type: "number", empty: false},
        gateway_sdpid: {type: "number", empty: false},
        protocol: {type: "enum", values: ["TCP", "UDP"]},
        port: {type: "number", empty: false},
        nat_ip: {type: "string", empty: true},
        nat_port: {type: "number", empty: true}
    },
};

