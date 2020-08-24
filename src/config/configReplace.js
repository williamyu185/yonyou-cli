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
    if(!globalYonyouCliTopLevelObj.globalSeparateYonbipHostFileConfig) {
        globalYonyouCliTopLevelObj.globalSeparateYonbipHostFileConfig = {
            dev: {
                apiHost: '',
                lang: ''
            },
            test: {
                apiHost: '',
                lang: ''
            },
            daily: {
                apiHost: ''
            },
            prev: {
                apiHost: '',
                lang: ''
            },
            production: {
                apiHost: '',
                lang: ''
            },
            smallProgrameTest: {
                apiHost: '',
                lang: ''
            },
            yonbip: {
                apiHost: '',
                lang: ''
            }
        };
    }
})();
