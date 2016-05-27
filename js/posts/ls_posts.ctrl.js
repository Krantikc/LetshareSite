
angular.module('Letshare').controller('PostsController', ['$scope', '$http', '$state', '$stateParams', 'svLocale', 'postsAPIService', 'categoryAPIService', 'Upload', 'locationsAPIService',
    function($scope, $http, $state, $stateParams, svLocale, postsAPIService, categoryAPIService, Upload, locationsAPIService) {
 
        
        document.cookie = 'auth_token=hello';
       $scope.selectedCity = {};                        
       locationsAPIService.getAllCities().then(function(response) {
           $scope.cities = response.data.cities;
           //$scope.post.city1 = $scope.cities[0];
           //$scope.post.city2 = $scope.cities[0];
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
 
        /*
        $scope.getPostsByCategory = function(category) {
            var queryParams = {
                cityId: $scope.selectedCity.cityId || 0, 
                searchTitle: $scope.searchTitle || '', 
                categoryId: category.categoryId || 0
            };
            window.localStorage.setItem('queryParams', JSON.stringify(queryParams));
            $state.go('posts', queryParams);
        }
                               
        $scope.getCategories = function() {
            categoryAPIService.getAllCategories().then(function(response) {
                $scope.categoriesList = response.data.categories;
            })
        }
        
        */
        $scope.getPosts = function() {
            
            var postsData = {
                searchTitle: $stateParams.searchTitle || '',
                cityId: $stateParams.cityId || 0,
                categoryId: $stateParams.categoryId || 0
            };
            
            if (window.localStorage.getItem('queryParams') != null) {
                queryParams = JSON.parse(window.localStorage.getItem('queryParams'));
                postsData.searchTitle = queryParams.searchTitle;
                postsData.cityId = queryParams.city.cityId;
                postsData.categoryId = queryParams.category.categoryId;
            }
            
            
            postsAPIService
                .getPosts(postsData)
                    .success(function(response) {
                        $scope.postsList = response.posts;
                        console.log('success');
                    });
                    
            //$scope.getCategories();
        };
        $scope.getPosts();
 

    }
    
        
]);

angular.module('Letshare').controller('PostsNewController', ['$scope', '$http', 'svLocale', 'postsAPIService', 'categoryAPIService', 'Upload', 'locationsAPIService',
    function($scope, $http, svLocale, postsAPIService, categoryAPIService, Upload, locationsAPIService) {
 
        document.cookie = 'auth_token=hello';
        
        $scope.post = {}; 
        $scope.textAreaRows = 7;
        
        $scope.measurements = [{label: 'Members', value: 'members'},
                               {label: 'Sq. Feet', value: 'sqfeet'},
                               {label: 'Litres', value: 'litres'},
                               {label: 'Others', value: 'others'}];
        
        $scope.post.measurement = $scope.measurements[0];
                              
        $scope.agePeriods =   [{label: 'Years', value: 'years'},
                               {label: 'Months', value: 'months'},
                               {label: 'Days', value: 'days'}];
                               
        $scope.post.ageType = $scope.agePeriods[0];
                               
       locationsAPIService.getAllCities().then(function(response) {
           $scope.cities = response.data.cities;
           $scope.post.city1 = $scope.cities[0];
           $scope.post.city2 = $scope.cities[0];
       }, function() {
           console.error('ERROR: While loading cities');
       });
           
        
        $scope.citySelectionChange = function(city, type) {
            console.info('City selection change');
            locationsAPIService.getLocationsByCity(city.cityId).then(function(response) {
                switch(type) {
                    case 'from':
                       $scope.fromLocations = [];
                       $scope.fromLocations = response.data.locations;
                       $scope.post.location1 = $scope.fromLocations[0];
                       break;
                    case 'to':
                       $scope.toLocations = [];
                       $scope.toLocations = response.data.locations;
                       $scope.post.location2 = $scope.toLocations[0];
                       break;
                    default:
                       $scope.fromLocations = response.data.locations;
                }
            }, function(error) {
                console.error('ERROR: while locations ' + error.data);
            });
            
        }   

        $scope.isVisibleField = function(field) {
          return _.findLastIndex($scope.categoryFields, {field: field}) > -1;
        }

        $scope.getCategoryFields = function() {
            categoryAPIService.getCategoryFields($scope.post.category.categoryId).
              then(function(response) {
                  $scope.categoryFields = response.data.categoryFields;
                  _.findIndex($scope.categoryFields, 'toLocation');
              }, function() {
                console.error('ERROR: While fetching category fields');
              });
        }

    
       $scope.$watch('post.category', function(newVal, oldVal) {
          console.info('Category selection change');
            
          $scope.getCategoryFields();
       });

       $scope.$watchGroup(['post.city1', 'post.city2'], function(newVal, oldVal) {
           if (newVal[0]) {
               $scope.citySelectionChange(newVal[0], 'from');
           }
           
           if (newVal[1]) {
               $scope.citySelectionChange(newVal[1], 'to');
           }
       });         
        
    
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
        
        $scope.getCategories();

        $scope.formValid = true;
        function validateForm(form) {
            if (form.$valid) {
                $scope.formValid = true;
                return true;
            } else {
                $scope.formValid = false;
                return false;
            }
        }
         
        $scope.submitPost = function() {
            var isFormValid = validateForm($scope.postForm);
            if (isFormValid) {
                var post = $scope.post;
                post.userId = $scope.currentUser.userId;
                post.categoryId = $scope.post.category.categoryId;
                post.city1Id = $scope.post.city1.cityId;
                post.location1Id = $scope.post.location1.locationId;
                
                //post.city2Id = $scope.post.city2.cityId;
                //post.location2Id = $scope.post.location2.locationId;
                
                post.measurement = $scope.post.measurement.value;
                post.age = $scope.post.age;
                postsAPIService
                    .addPost(post)
                    .success(function(response) {
                        //$scope.postsList = response.posts;
                        console.log(response);
                        $scope.successMsg = 'Your ad has been posted successfully.';
                        $scope.post = null;
                        scope.postForm.$setPristine();
                    });
            }
            
                    
        };
        
    }
    
        
]);


angular.module('Letshare').controller('PostsDetailsController', ['$scope', '$stateParams', 'svLocale', 'postsAPIService', 'categoryAPIService', 'Upload', 'locationsAPIService',
    function($scope, $stateParams, svLocale, postsAPIService, categoryAPIService, Upload, locationsAPIService) {

        postsAPIService.getPostById($stateParams.id).then(function(response) {
            var result = response.data;
            $scope.postDetails = result.post;
        }, function() {
            console.log('ERROR');
        })
       
    }
    
        
]);