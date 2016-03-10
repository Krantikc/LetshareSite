
angular.module('Letshare').factory('postsAPIService',
    function($http, ENV) {
        
        var postsService = {};
        
        postsService.getAllPosts = function() {
            return $http({
                method: 'GET',
                url: ENV.api + 'post',
                params: {title: ''}
            });
        };
        
        postsService.getPosts = function(filterParams) {
            return $http({
                method: 'GET',
                url: ENV.api + 'post',
                params: filterParams,
            });
        };
            
        postsService.addPost = function(post) {
            return $http({
                method: 'POST',
                url: ENV.api + 'post',
                data: post,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        
                    return str.join("&");
                },
            });
        };
        
        return postsService;
    }
);