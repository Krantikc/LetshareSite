
angular.module('Letshare').factory('locationsAPIService',
    function($http, ENV) {
        
        var locationsService = {};
        
        locationsService.getAllCities = function() {
            return $http({
                method: 'GET',
                url: ENV.api + 'city'
            });
        };
        
        locationsService.getLocationsByCity = function(cityId) {
            return $http({
                method: 'GET',
                url: ENV.api + 'location/' + cityId
            });
        };
            
       
        return locationsService;
    }
);