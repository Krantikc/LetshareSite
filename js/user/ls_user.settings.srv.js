
angular.module('Letshare').factory('userSettingsAPIService',
    function($http, ENV) {
        
        var userSettingsService = {};
        
        userSettingsService.getUserById = function(userId) {
            return $http({
                method: 'GET',
                url: ENV.api + 'user/' + userId
            });
        };

        userSettingsService.updateUser = function(user) {
            return $http({
                method: 'POST',
                url: ENV.api + 'user',
                data: user
            });
        };

        userSettingsService.changeUserPassword = function(user) {
            return $http({
                method: 'POST',
                url: ENV.api + 'user/password',
                data: user,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }      
                    return str.join("&");
                }
            });
        };
        
      
        return userSettingsService;
    }
);