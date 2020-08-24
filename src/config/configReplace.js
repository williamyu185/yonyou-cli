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
    globalObj.globalYonyouCliTopLevelObj = globalObj.globalYonyouCliTopLevelObj || {};
    var globalYonyouCliTopLevelObj = globalObj.globalYonyouCliTopLevelObj;
    !globalYonyouCliTopLevelObj.globalSeparateYonbipHostFileConfig && (globalYonyouCliTopLevelObj.globalSeparateYonbipHostFileConfig = {});
    !globalYonyouCliTopLevelObj.globalSeparateYonbipHostFileConfig && (globalYonyouCliTopLevelObj.globalSeparateYonbipHostFileConfig = {
        dev: {
            apiHost: ''
        },
        test: {
            apiHost: ''
        },
        daily: {
            apiHost: ''
        },
        prev: {
            apiHost: ''
        },
        production: {
            apiHost: ''
        }
    });
})();
