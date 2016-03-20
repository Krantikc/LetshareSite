angular.module('Letshare').factory('authInterceptor', function() {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if (window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + window.sessionStorage.token;
            }
            return config;
        },
        response: function(response) {
          // do something on success
          return response;
        }
    }
});