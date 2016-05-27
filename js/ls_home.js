angular.module('Letshare').controller('HomeController',
    function($scope, $http, $state, $modal, svLocale, categoryAPIService, locationsAPIService) {
        console.log('Home');
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.categories = [{
            value: 0
        },{
            value: 1
        },{
            value: 2
        }];
        
        /*
        $scope.searchTitle = '';
        $scope.selection = {};
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
        $scope.getPosts = function(cityId, category, searchTitle) {
            var queryParams = {
                cityId: cityId, 
                searchTitle: searchTitle, 
                categoryId: category.categoryId
            };
            window.localStorage.setItem('queryParams', JSON.stringify(queryParams));
            $state.go('posts', queryParams);
        }
        locationsAPIService.getAllCities().then(function(response) {
           $scope.cities = response.data.cities;
           $scope.selectedCity = $scope.cities[0];
        }, function() {
           console.error('ERROR: While loading cities');
        });
        $scope.getCategories();
        */
    }
);