'use strict';

module.exports = {
    service_client_grant: {
        service_id: {type: "number", positive: true, convert: true},
        sdpid_list: {type: "array", min: 1, items: {type: "number", positive: true, convert: true}}
    },
    service_group_grant: {
        service_id: {type: "number", positive: true, convert: true},
        group_list: {type: "array", min: 1, items: {type: "number", positive: true, convert: true}}
    },
    topic_client_grant: {
        topic_id: {type: "number", positive: true, convert: true},
        sdpid_list: {type: "array", min: 1, items: {type: "number", positive: true, convert: true}}
    },
    topic_group_grant: {
        topic_id: {type: "number", positive: true, convert: true},
        group_list: {type: "array", min: 1, items: {type: "number", positive: true, convert: true}}
    },
    topic_user_grant: {
        topic_id: {type: "number", positive: true, convert: true},
        user_list: {type: "array", min: 1, items: {type: "number", positive: true, convert: true}}
    }
};