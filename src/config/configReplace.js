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
    !globalObj.globalSeparateConfigYonbipHostFile && (globalObj.globalSeparateConfigYonbipHostFile = {});
    !globalObj.globalSeparateConfigYonbipHostFile.config && (globalObj.globalSeparateConfigYonbipHostFile.config = {
        dev: {

        },
        test: {
      
        },
        daily: {
      
        },
        prev: {
      
        },
        production: {
      
        }
    });
})();
