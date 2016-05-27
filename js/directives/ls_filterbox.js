angular.module('Letshare').directive('filterBox', function() {
    return {
        restrict: 'AEC',
        templateUrl: 'partials/filter-box.html',
        controller: function($scope, $state, locationsAPIService, categoryAPIService) {
            $scope.searchTitle = '';
            $scope.selection = {};
            $scope.queryParams = JSON.parse(window.localStorage.getItem('queryParams'));
            $scope.onCitySelection = function() {
                $scope.selectedCity = $scope.selection.city.originalObject;
                //$('.area-selection-box').removeClass('in');
            }
            
            $scope.$watch('selectedCity', function(newVal, oldVal) {
                //if (newVal !== oldVal) {
                    $('.area-selection-box').removeClass('in');
                //}
            })
            
            
            $scope.getCategories = function() {
                categoryAPIService.getAllCategories().then(function(response) {
                    $scope.categoriesList = response.data.categories;
                }, function() {
                    console.error('ERROR: While loading categories');
                });
            }
            
            $scope.selectPopularCity = function(city) {
                $scope.selectedCity = city;
            }
            $scope.getPosts = function(city, category, searchTitle) {
                var queryParams = {
                    city: city, 
                    searchTitle: searchTitle, 
                    category: category
                };
                window.localStorage.setItem('queryParams', JSON.stringify(queryParams));
                $state.go('posts', queryParams);
            }
            locationsAPIService.getAllCities().then(function(response) {
               $scope.cities = response.data.cities;
               
               //$scope.selectedCity = $scope.cities[0];
            }, function() {
               console.error('ERROR: While loading cities');
            });
            $scope.getCategories();
            
            $scope.$watchGroup(['cities', 'categoriesList'], function(newVal) {
                if (newVal[0]) {
                   $scope.selectedCity = $scope.cities[0];
                    if ($scope.queryParams) {
                        $scope.selectedCity = $scope.queryParams.city;
                        $scope.searchTitle = $scope.queryParams.searchTitle;
                    } 
                }
                
            });
        },
        link: function($scope, $element, attr) {
            $(".main-image").fadeOut(2).fadeIn(700);
        }
    }
    
});
