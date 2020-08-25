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
    globalObj.globalYonyouCoordinationCliTopLevelObj = globalObj.globalYonyouCoordinationCliTopLevelObj || {};
    var globalYonyouCoordinationCliTopLevelObj = globalObj.globalYonyouCoordinationCliTopLevelObj;
    if(!globalYonyouCoordinationCliTopLevelObj.separateYonbipHostFileConfig) {
        globalYonyouCoordinationCliTopLevelObj.separateYonbipHostFileConfig = {
            dev: {
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
            yonbip: {
                mainHost: ''
            }
        };
    }
})();
