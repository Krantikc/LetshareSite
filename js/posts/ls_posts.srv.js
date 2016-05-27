
angular.module('Letshare').factory('postsAPIService',
    function($http, ENV, Upload) {
        
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
        
        postsService.getPostById = function(postId) {
            return $http({
                method: 'GET',
                url: ENV.api + 'post/' + postId
            });
        };
            
        postsService.addPost = function(post) {
            return Upload.upload({
                url: ENV.api + 'post',
                data: post
            });
            /*
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
            */
        };
        
        return postsService;
    }
);