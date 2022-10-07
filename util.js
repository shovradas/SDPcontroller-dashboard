'use strict';

exports.capitalizeFirstLetter = (string)=> {
    if (!string) return;
    return string.match("^[a-z]") ? string.charAt(0).toUpperCase() + string.slice(1) : string;
}

exports.compareByPropertyAndOrder = (property, order) => {
    return function (a, b) {
        let aValue = a[property];
        let bValue = b[property];

        aValue = typeof aValue == 'string'? aValue.toLowerCase() : aValue;
        bValue = typeof bValue == 'string'? bValue.toLowerCase() : bValue;
        
        let sortStatus = aValue > bValue ? 1 : (aValue < bValue? -1 : 0);
        sortStatus = order == 'desc' && sortStatus!=0 ? sortStatus *= -1 : sortStatus;
        
        return sortStatus;
    };
}