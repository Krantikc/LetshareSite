
angular.module('Letshare').controller('PostsController', ['$scope', '$http', 'svLocale', 'postsAPIService', 'categoryAPIService',
    function($scope, $http, svLocale, postsAPIService, categoryAPIService) {
 
        $scope.visibleFields = {}; 
        $scope.getCategories = function() {
            categoryAPIService.getAllCategories().then(function(response) {
                $scope.categoriesList = response.data.categories;
            })
        }
        
        $scope.getPosts = function() {
            postsAPIService
                .getPosts({title: 'n'})
                    .success(function(response) {
                        $scope.postsList = response.posts;
                        console.log('success');
                    });
                    
            $scope.getCategories();
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
        
                
        $scope.onCategorySelection = function() {
            switch($scope.selectedCategory) {
                case 1:
                case 2:
                case 3:
                    $scope.visibleFields.location2 = true;
                    $scope.visibleFields.location3 = true;
                    break;
                default:
                    $scope.visibleFields.location2 = false;
                    $scope.visibleFields.location3 = false;
            }
        };
    }
    
        
]);