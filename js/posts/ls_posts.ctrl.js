
angular.module('Letshare').controller('PostsController', ['$scope', '$http', 'svLocale', 'postsAPIService', 'categoryAPIService',
    function($scope, $http, svLocale, postsAPIService, categoryAPIService) {
 
        document.cookie = 'auth_token=hello';
        $scope.visibleFields = {}; 
        $scope.textAreaRows = 8;
        
        $scope.measurements = [{label: 'Killogroms', value: 'kg'},
                               {label: 'Litres', value: 'litres'},
                               {label: 'Members', value: 'members'},
                               {label: 'Others', value: 'others'}];
                              
        $scope.agePeriods = [{label: 'Years', value: 'years'},
                               {label: 'Months', value: 'months'},
                               {label: 'days', value: 'days'}];
                               
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
                    $scope.textAreaRows = 4;
                    break;
                default:
                    $scope.visibleFields.location2 = false;
                    $scope.visibleFields.location3 = false;
                    $scope.textAreaRows = 8;
            }
        };
    }
    
        
]);