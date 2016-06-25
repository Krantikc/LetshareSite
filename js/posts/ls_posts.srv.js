
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
        
         postsService.getPostsByUserId = function(userId, active) {
            return $http({
                method: 'GET',
                url: ENV.api + 'post/user',
                params: {userId: userId, active: active},
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
        };
        
        return postsService;
    }
);