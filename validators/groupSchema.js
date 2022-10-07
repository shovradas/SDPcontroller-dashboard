'use strict';

module.exports = {
    create: {
        valid: {type: "enum", values: ["0", "1"]},
        name: {type: "string", empty: false},
        description: {type: "string", empty: false}
    },
    update: {
        id: {type: "number", positive: true},
        valid: {type: "number", min:0, max: 1},
        name: {type: "string", empty: false},
        description: {type: "string", empty: false}
    }
};