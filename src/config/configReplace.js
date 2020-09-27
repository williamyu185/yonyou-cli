(function() {
    var getGlobalObject = function() {
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
    var globalObj = getGlobalObject();
    globalObj.globalUniquenessCoordinationCliTopLevelObj = globalObj.globalUniquenessCoordinationCliTopLevelObj || {};
    var globalUniquenessCoordinationCliTopLevelObj = globalObj.globalUniquenessCoordinationCliTopLevelObj;
    if(!globalUniquenessCoordinationCliTopLevelObj.separateHostFileConfig) {
        globalUniquenessCoordinationCliTopLevelObj.separateHostFileConfig = {
            development: {
                mainHost: ''
            },
            test: {
                mainHost: ''
            },
            daily: {
                mainHost: ''
            },
            prev: {
                mainHost: ''
            },
            production: {
                mainHost: ''
            },
            smallProgramTest: {
                mainHost: ''
            },
            private: {
                mainHost: ''
            }
        };
    }
})();
