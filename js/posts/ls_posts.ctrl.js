
angular.module('Letshare').controller('PostsController', ['$scope', '$http', 'svLocale', 'postsAPIService', 'categoryAPIService', 'Upload', 'locationsAPIService',
    function($scope, $http, svLocale, postsAPIService, categoryAPIService, Upload, locationsAPIService) {
 
        document.cookie = 'auth_token=hello';
        $scope.visibleFields = {}; 
        $scope.textAreaRows = 7;
        
        $scope.measurements = [{label: 'Killogroms', value: 'kg'},
                               {label: 'Litres', value: 'litres'},
                               {label: 'Members', value: 'members'},
                               {label: 'Others', value: 'others'}];
                              
        $scope.agePeriods = [{label: 'Years', value: 'years'},
                               {label: 'Months', value: 'months'},
                               {label: 'days', value: 'days'}];
                               
                           locationsAPIService.getAllCities().then(function(response) {
                               $scope.cities = response.data.cities;
                           }, function() {
                               console.error('ERROR: While loading cities');
                           });
                           
        $scope.citySelectionChange = function(city, type) {
            locationsAPIService.getLocationsByCity(city.cityId).then(function(response) {
                switch(type) {
                    case 'from':
                       $scope.fromLocations = [];
                       $scope.fromLocations = response.data.locations;
                       break;
                    case 'to':
                       $scope.toLocations = [];
                       $scope.toLocations = response.data.locations;
                       break;
                    default:
                       $scope.fromLocations = response.data.locations;
                }
            }, function() {
                console.error('ERROR: while locations');
            });
            
        }
    
        $scope.submit = function() {
          if ($scope.form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
          }
        };

        // upload on file select or drop
        $scope.upload = function (file) {
            Upload.upload({
                url: 'http://localhost:8099/LetshareCore/rest/post/upload',
                data: {uploadedFile: file, 'name': 'krantu'}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };
                               
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
                    $scope.textAreaRows = 7;
            }
        };
    }
    
        
]);