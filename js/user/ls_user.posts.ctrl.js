
angular.module('Letshare').controller('UserPostsController', ['$scope', '$http', 'svLocale', 'postsAPIService',
    function($scope, $http, svLocale, postsAPIService) {
 
        $scope.getPosts = function() {
            postsAPIService
                .getPosts({title: 'n'})
                    .success(function(response) {
                        $scope.postsList = response.posts;
                        console.log('success');
                    });
        };
        $scope.getPosts();
        
        $scope.submitPost = function() {
            postsAPIService
                .addPost($scope.post)
                    .success(function(response) {
                        //$scope.postsList = response.posts;
                        console.log(response);
                    });
        };

    }
    
        
]);