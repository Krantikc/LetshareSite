
angular.module('Letshare').factory('userAPIService',
    function($http, ENV) {
        
        var userService = {};
        
        userService.getAllUsers = function() {
            return $http({
                method: 'GET',
                url: ENV.api + 'user'
            });
        };
        
        userService.getPosts = function(filterParams) {
            return $http({
                method: 'GET',
                url: ENV.api + 'post',
                params: filterParams,
            });
        };
            
        userService.addUser = function(user) {
            return $http({
                method: 'POST',
                url: ENV.api + 'user',
                data: user
            });
        };
        
        return userService;
    }
);