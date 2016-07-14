
angular.module('Letshare').controller('PostsController', ['$scope', '$http', '$state', '$stateParams', 'svLocale', 'postsAPIService', 'categoryAPIService', 'Upload', 'locationsAPIService',
    function($scope, $http, $state, $stateParams, svLocale, postsAPIService, categoryAPIService, Upload, locationsAPIService) {
 
        
        document.cookie = 'auth_token=hello';
       $scope.selectedCity = {};   

        var postsData = {
            searchTitle: $stateParams.searchTitle || '',
            categoryId: $stateParams.categoryId || 0,
            postType: $stateParams.postType || 'share',
            processDate: $stateParams.processDate || null,
            city1Id: $stateParams.city1Id || 0,
            location1Id: $stateParams.location1Id || 0,
            city2Id: $stateParams.city2Id || 0,
            location2Id: $stateParams.location2Id || 0
        };


        $scope.getPosts = function() {
                    /*
                    category: category,
                    type: type, 
                    searchTitle: searchTitle,
                    processDate: processDate == null ? {} : processDate.toLocaleDateString(),
                    city1: city1,
                    location1: location1,
                    city2: city2,
                    location2: location2
                    */


            //var postsData = {};
            
            if (window.localStorage.getItem('queryParams') != null) {
                queryParams = angular.fromJson(window.localStorage.getItem('queryParams'));
                
                postsData.searchTitle = queryParams.searchTitle || postsData.searchTitle;
                postsData.categoryId = (queryParams.category && queryParams.category.categoryId) || postsData.categoryId;
                postsData.postType = queryParams.postType || postsData.postType;
                postsData.processDate = queryParams.processDate || postsData.processDate;

                postsData.city1Id = (queryParams.city1 && queryParams.city1.cityId) || postsData.city1Id;
                postsData.location1Id = (queryParams.location1 && queryParams.location1.locationId) || postsData.location1Id;
                postsData.city2Id = (queryParams.city2 && queryParams.city2.cityId) || postsData.city2Id;
                postsData.location2Id = (queryParams.location2 && queryParams.location2.locationId) || postsData.location2Id;
                
                //postsData = queryParams;
            }

            
            
            postsAPIService
                .getPosts(postsData)
                    .then(function(response) {
                        $scope.postsList = response.data.posts;
                        console.log('success');
                    }, function() {
                      console.error('ERROR');
                    });
                    
            //$scope.getCategories();
        };

        $scope.getPosts();

        function setFilterFields() {

        }
 

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

        $scope.today = function() {
            $scope.dt = new Date();
        };

        $scope.today();

        $scope.popup = {
            opened: false
        };

        $scope.open = function() {
            $scope.popup.opened = true;
        };
                               
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
            categoryAPIService.getCategoryFields($scope.post.category[0].categoryId).
              then(function(response) {
                  $scope.categoryFields = response.data.categoryFields;
                  _.findIndex($scope.categoryFields, 'toLocation');
              }, function() {
                console.error('ERROR: While fetching category fields');
              });
        }

    
       $scope.$watchCollection('post.category', function(newVal, oldVal) {
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

                               
        $scope.getCategories = function() {
            categoryAPIService.getAllCategories().then(function(response) {
                $scope.categoriesList = [];
                var categoriesList = response.data.categories;
                for (var i in categoriesList) {
                    if (categoriesList[i].cgroup) {
                      if (i != 0) {
                        $scope.categoriesList.push({
                          msGroup: false
                        });
                      }
                      
                      $scope.categoriesList.push({
                        name: '<strong>' + categoriesList[i].name + '<strong>',
                        msGroup: true
                      });
                    } else {
                       $scope.categoriesList.push({
                          categoryId: categoriesList[i].categoryId,
                          name: categoriesList[i].name,
                          ticked: false,
                          icon: '<img src="imgs/categories/' + categoriesList[i].image + '" />'
                       });
                    }
                    
                }
                //$scope.categoriesList = response.data.categories;
                console.log($scope.categoriesList);
            });
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
            $scope.successMsg = null;
            var isFormValid = validateForm($scope.postForm);
            if (isFormValid) {
                var post = $scope.post;
                post.userId = $scope.currentUser.userId;
                post.categoryId = $scope.post.category[0].categoryId;
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

angular.module('Letshare').controller('PostsEditController', ['$scope', '$http', '$stateParams', 'svLocale', 'postsAPIService', 'categoryAPIService', 'Upload', 'locationsAPIService',
    function($scope, $http, $stateParams, svLocale, postsAPIService, categoryAPIService, Upload, locationsAPIService) {
 
        $scope.post = {}; 

        $scope.measurements = [{label: 'Members', value: 'members'},
                               {label: 'Sq. Feet', value: 'sqfeet'},
                               {label: 'Litres', value: 'litres'},
                               {label: 'Others', value: 'others'}];
        
        $scope.post.measurement = $scope.measurements[0];
                              
        $scope.agePeriods =   [{label: 'Years', value: 'years'},
                               {label: 'Months', value: 'months'},
                               {label: 'Days', value: 'days'}];
                               
        $scope.post.ageType = $scope.agePeriods[0];


        postsAPIService.getPostById($stateParams.postId).then(function(response) {
            var result = response.data;
            var post = result.post;

            $scope.post = post;
            
            Object.assign($scope.post, $scope.post.postLocation);
            Object.assign($scope.post, $scope.post.postDetails);
            for (var i in $scope.cities) {
                if ($scope.post.city1Id == $scope.cities[i].cityId) {
                    $scope.post['city1'] = $scope.cities[i];
                }

                if ($scope.post.city2Id == $scope.cities[i].cityId) {
                    $scope.post['city2'] = $scope.cities[i];
                }
            }

            for (var j in $scope.measurements) {
                if ($scope.post.measurement == $scope.measurements[j].value) {
                    $scope.post.measurement = $scope.measurements[j];
                }
            }

            for (var k in $scope.agePeriods) {
                if ($scope.post.ageType == $scope.agePeriods[k].value) {
                    $scope.post.ageType = $scope.agePeriods[k];
                }
            }

            $scope.getCategories();


        }, function() {
            console.error('ERROR');
        });
        $scope.textAreaRows = 7;
        
        
                               
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
                        for (var i in $scope.fromLocations) {
                          if ($scope.post.location1Id == $scope.fromLocations[i].locationId) {
                            $scope.post['location1'] = $scope.fromLocations[i];
                          }
                        }
                       break;
                    case 'to':
                       $scope.toLocations = [];
                       $scope.toLocations = response.data.locations;
                       for (var j in $scope.toLocations) {
                          if ($scope.post.location2Id == $scope.toLocations[j].locationId) {
                            $scope.post['location2'] = $scope.toLocations[j];
                          }
                       }
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
            categoryAPIService.getCategoryFields($scope.post.categoryId).
              then(function(response) {
                  $scope.categoryFields = response.data.categoryFields;
                  _.findIndex($scope.categoryFields, 'toLocation');
              }, function() {
                console.error('ERROR: While fetching category fields');
              });
        }



       $scope.$watchGroup(['post.city1', 'post.city2'], function(newVal, oldVal) {
           if (newVal[0]) {
               $scope.citySelectionChange(newVal[0], 'from');
           }
           
           if (newVal[1]) {
               $scope.citySelectionChange(newVal[1], 'to');
           }
       });         


       $scope.getCategories = function() {
            categoryAPIService.getAllCategories().then(function(response) {
                $scope.categoriesList = [];
                $scope.categoriesListCopy = response.data.categories;
                var categoriesList = response.data.categories;
                var finalCategoriesList = [];
                for (var i=0; i<categoriesList.length; i++) {
                    if (categoriesList[i].cgroup) {
                      if (i != 0) {
                        finalCategoriesList.push({
                          msGroup: false
                        });
                      }
                      
                      finalCategoriesList.push({
                        name: '<strong>' + categoriesList[i].name + '<strong>',
                        msGroup: true
                      });
                    } else {
                       finalCategoriesList.push({
                          categoryId: categoriesList[i].categoryId,
                          name: categoriesList[i].name,
                          ticked: false,
                          icon: '<img src="imgs/categories/' + categoriesList[i].image + '" />'
                       });
                    }

                    
                    
                }
                $scope.categoriesList = finalCategoriesList;
                //$scope.categoriesList = response.data.categories;
                console.log($scope.categoriesList);
                $scope.getCategoryFields();
            })
        }
        
        

       /* $scope.$watch('post', function(newVal, oldVal) {
           if (newVal != oldVal) {
               $scope.getCategories();
           } 
        }); */   

        $scope.$watchCollection('categoriesList', function(newVal, oldVal) {
           if (newVal && newVal != oldVal) {
                var index = -1;
                for (var j=0; j< $scope.categoriesList.length;j++) {
                    if ($scope.categoriesList[j].categoryId == $scope.post.categoryId) {
                        console.log(j);
                        index = j;
                        break;
                    }
                }
                $scope.selectedCategory = $scope.categoriesListCopy[index];
           } 

        });    

        
        
        // upload on file select or drop

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
                post.categoryId = $scope.selectedCategory.categoryId;
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
                        $scope.successMsg = 'Your ad has been updated successfully.';
                    });
            }
            
                    
        };
        
    }
]);


angular.module('Letshare').controller('PostsDetailsController', ['$scope', '$stateParams', 'svLocale', 'postsAPIService', 
                                                                 'categoryAPIService', 'Upload', 'locationsAPIService', 'genericAPIService', 'userAPIService',
    function($scope, $stateParams, svLocale, postsAPIService, categoryAPIService, Upload, locationsAPIService, genericAPIService, userAPIService) {


        postsAPIService.getPostById($stateParams.id).then(function(response) {
            var result = response.data;
            $scope.post = result.post;
            var location = $scope.post.postLocation;

            genericAPIService.getObject(location.city1Id, 'city').then(function(response) {
                $scope.postFromCity = response.data.object;
            });

            genericAPIService.getObject(location.city2Id, 'city').then(function(response) {
                $scope.postToCity = response.data.object;
            });

            genericAPIService.getObject(location.location1Id, 'location').then(function(response) {
                $scope.postFromLocation = response.data.object;
            });

            genericAPIService.getObject(location.location2Id, 'location').then(function(response) {
                $scope.postToLocation = response.data.object;
            });

            genericAPIService.getObject($scope.post.categoryId, 'category').then(function(response) {
                $scope.postCategory = response.data.object;

            });

            userAPIService.getUser($scope.post.userId).then(function(response) {
                $scope.user = response.data.user;
            });
            
        }, function() {
            console.log('ERROR');
        });


        locationsAPIService.getAllCities().then(function(response) {
            var result = response.data;
            $scope.cities = result.cities;
        }, function() {
            console.log('ERROR');
        });

        locationsAPIService.getAllLocations().then(function(response) {
            var result = response.data;
            $scope.locations = result.locations;
        }, function() {
            console.log('ERROR');
        });

       
    }
    
        
]);