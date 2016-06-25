
angular.module('Letshare').controller('UserPostsController',
    function($rootScope, $scope, $http, svLocale, postsAPIService) {
 
        $scope.activePost = 'true';
        $scope.getPosts = function() {

            postsAPIService
                .getPostsByUserId($rootScope.currentUser.userId, $scope.activePost)
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

        $scope.$watch('activePost', function(newVal, oldVal) {
            $scope.getPosts();
        }, true);
    });