angular.module('Letshare').factory('authInterceptor', function() {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            var token = 'Bearer access';
            if (window.localStorage.token && window.localStorage.token != 'undefined') {
                token = 'Bearer ' + window.localStorage.token;
            }
            
            config.headers.Authorization = config.headers.Authorization || token;
            return config;
        },
        response: function(response) {
          // do something on success
          if (response.data) {
              window.localStorage.token = response.data.token || window.localStorage.token;
          }
          return response;
        }
    }
});