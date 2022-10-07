'use strict';

module.exports = {
    pagination: {
        page: {type: "number", positive: true, min:1, convert: true},
        limit: {type: "number", positive: true, convert: true}
    }
};
