'use strict';

module.exports = {
    create: {
        last_name: {type: "string", empty: false},
        first_name: {type: "string", empty: false},
        country: {type: "string", empty: true, length: 2},
        state: {type: "string", empty: true, max:128},
        locality: {type: "string", empty: true, max:128},
        org: {type: "string", empty: true, max:128}
    },
    update: {
        id: {type: "number", positive: true},
        last_name: {type: "string", empty: false},
        first_name: {type: "string", empty: false},
        country: {type: "string", empty: true, length: 2},
        state: {type: "string", empty: true, max:128},
        locality: {type: "string", empty: true, max:128},
        org: {type: "string", empty: true, max:128}
    }
};
