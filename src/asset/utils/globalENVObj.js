let getGlobalObject = function() {
    if (typeof globalThis !== 'undefined') {
        return globalThis; 
    }
    if (typeof self !== 'undefined') {
        return self; 
    }
    if (typeof window !== 'undefined') {
        return window; 
    }
    if (typeof global !== 'undefined') {
        return global; 
    }
    throw new Error('cannot find the global object');
};
let globalENVObj = getGlobalObject();
module.exports = globalENVObj;
