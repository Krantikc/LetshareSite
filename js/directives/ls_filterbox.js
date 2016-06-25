angular.module('Letshare').directive('filterBox', function() {
    return {
        restrict: 'AEC',
        templateUrl: 'partials/filter-box.html',
        controller: function($scope, $state, locationsAPIService, categoryAPIService) {
            $scope.searchTitle = '';
            $scope.selection = {};
            $scope.queryParams = JSON.parse(window.localStorage.getItem('queryParams'));


            function setCategory(categoryId) {
                var foundCategoryIndex = _.findLastIndex($scope.categoriesList, {categoryId: categoryId});
                if (foundCategoryIndex > -1) {
                    var foundCategory = $scope.categoriesList[foundCategoryIndex];
                    $scope.selectedCategory = foundCategory;
                    $scope.categoriesList[foundCategoryIndex].ticked = true;
                }
            }

            function resetCategory() {
                $scope.selectedCategory = [];
                for (var i in $scope.categoriesList) {
                    $scope.categoriesList[i].ticked = false;
                }
            }

            function getCity(cityId) {
                var foundCityIndex = _.findLastIndex($scope.cities, {cityId: cityId});
                return $scope.cities[foundCityIndex];
            }

            function getLocation(locationId, type) {
                var scopeVar = '';
                switch(type) {
                        case 'from':
                           scopeVar = 'fromLocations';
                           break;
                        case 'to':
                           scopeVar = 'toLocations';
                           break;
                        default:
                           scopeVar = 'fromLocations';
                    }
                var foundLocationIndex = _.findLastIndex($scope[scopeVar], {locationId: locationId});
                return $scope[scopeVar][foundLocationIndex];
            }

            $scope.resetFilters = function() {

                    resetCategory();

                    $scope.selection.postType = 'share';


                    $scope.journeyDate = null;

                    // From city
                    
                    $scope.selection.city = null;
                     $scope.selectedCity1 = $scope.cities[0];

                    // To city
                    $scope.selectedCity2 = null;

                    $scope.selectedLocation1 = null;

                    $scope.selectedLocation2 = null;

                    $scope.searchTitle = '';

                    window.localStorage.removeItem('queryParams');
                    $scope.getPosts();


            }


             $scope.$watch('selection.city', function(newVal, oldVal) {
                if (newVal && !angular.equals(newVal, oldVal)) {
                    $scope.selectedCity1 = $scope.selection.city;
                }
            })
            
            $scope.$watchGroup(['selectedCity1', 'selectedCity2'], function(newVal, oldVal) {
                if (newVal && !angular.equals(newVal, oldVal)) {
                    if (newVal[0]) {
                        $('.area-selection-box').removeClass('in');
                        $scope.citySelectionChange($scope.selectedCity1, 'from');
                    }

                    if (newVal[1]) {
                        $scope.citySelectionChange($scope.selectedCity2, 'to');
                    }
                    
                }
            })
                       
            
            
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
            
            $scope.selectPopularCity = function(city) {
                //$scope.selectedCity1 = city;
                $scope.selection.city = city;
            }
            $scope.getPosts = function(category, postType, searchTitle, processDate, city1, location1, city2, location2) {
                var queryParams = { 
                    category: category,
                    postType: postType, 
                    searchTitle: searchTitle,
                    processDate: processDate == null ? undefined : processDate.toLocaleDateString(),
                    city1: city1,
                    location1: location1,
                    city2: city2,
                    location2: location2
                };
                window.localStorage.setItem('queryParams', angular.toJson(queryParams));
                $state.go('posts', queryParams);
            }

            locationsAPIService.getAllCities().then(function(response) {
               $scope.cities = response.data.cities;
               
               //$scope.selectedCity = $scope.cities[0];
            }, function() {
               console.error('ERROR: While loading cities');
            });


            
            $scope.getCategories();
            
            $scope.$watchGroup(['cities', 'categoriesList'], function(newVal, oldVal) {
                if ((newVal[0] && newVal[0].length > 0) && (newVal[1] && newVal[1].length > 0) && (!angular.equals(newVal, oldVal))) {
                    $scope.selectedCity1 = $scope.cities[0];
                    
                    $scope.loadFilters();
                }
                
            });

            $scope.isVisibleField = function(field) {
              return _.findLastIndex($scope.categoryFields, {field: field}) > -1;
            }

            $scope.getCategoryFields = function() {
                var categoryId = $scope.selectedCategory[0] == undefined ? 0 : $scope.selectedCategory[0].categoryId;
                categoryAPIService.getCategoryFields(categoryId).
                  then(function(response) {
                      $scope.categoryFields = response.data.categoryFields;
                      $scope.visbleField = $scope.isVisibleField('toLocation');
                      console.log($scope.visbleField);
                  }, function() {
                    console.error('ERROR: While fetching category fields');
                  });
            }

            $scope.citySelectionChange = function(city, type) {
                locationsAPIService.getLocationsByCity(city.cityId).then(function(response) {
                    switch(type) {
                        case 'from':
                           $scope.fromLocations = [];
                           $scope.fromLocations = response.data.locations;
                           if ($scope.queryParams) {
                                // From location
                                var location1Id = queryParams.location1 == null ? 0 : queryParams.location1.locationId;
                                $scope.selectedLocation1 = getLocation(location1Id, 'from');
                           }
                           
                           break;
                        case 'to':
                           $scope.toLocations = [];
                           $scope.toLocations = response.data.locations;

                           if ($scope.queryParams) {
                                // To location
                                var location2Id = queryParams.location2 == null ? 0 : queryParams.location2.locationId;
                                $scope.selectedLocation2 = getLocation(location2Id, 'to');
                           }
                            
                           break;
                        default:
                           $scope.fromLocations = response.data.locations;
                    }

                     if (window.localStorage.getItem('queryParams') != null) {
                        

                        

                       
                    }

                }, function() {
                    console.error('ERROR: while locations');
                });
                
            };

            $scope.loadFilters = function() {
                if (window.localStorage.getItem('queryParams') != null) {
                    var queryParams = angular.fromJson(window.localStorage.getItem('queryParams'));

                   // $scope.selectedCategory[0] = queryParams.category;
                   var categoryId = queryParams.category == null ? 0 : queryParams.category.categoryId;
                   setCategory(categoryId)

                    $scope.selection.postType = queryParams.postType;


                    $scope.journeyDate = queryParams.processDate == null ? null : new Date(Date.parse(queryParams.processDate));

                    // From city
                    var city1Id = queryParams.city1 == null ? 0 : queryParams.city1.cityId;
                    
                    $scope.selection.city = getCity(city1Id);
                    $scope.selectedCity1 = $scope.selection.city;

                    // To city
                     var city2Id = queryParams.city2 == null ? 0 : queryParams.city2.cityId;
                    $scope.selectedCity2 = getCity(city2Id);

                    
                    
                    //postsData = queryParams;
                }
            };


            

        
           $scope.$watchCollection('selectedCategory', function(newVal, oldVal) {
              console.info('Category selection change');
                if (newVal && !angular.equals(newVal, oldVal)) {
                     $scope.getCategoryFields();
                }
           });

         

        },
        link: function($scope, $element, attr) {


            $scope.dateOptions = {
                dateDisabled: false,
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.today = function() {
                $scope.journeyDate = new Date();
            };

            //$scope.today();
            $scope.journeyDate = null;

            $scope.popup = {
                opened: false
            };

            $scope.open = function() {
                $scope.popup.opened = true;
            };

           

        }
    }
    
});
