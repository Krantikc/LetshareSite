
angular.module('Letshare').factory('categoryAPIService',
    function($http, ENV) {
        
        var categoryService = {};
        
        categoryService.getAllCategories = function() {
            return $http({
                method: 'GET',
                url: ENV.api + 'category/all'
            });
        };
        
        categoryService.getCategories = function(filterParams) {
            return $http({
                method: 'GET',
                url: ENV.api + 'category',
                params: filterParams,
            });
        };

        categoryService.getCategoryFields = function(categoryId) {
            return $http({
                method: 'GET',
                url: ENV.api + 'category/fields/' + categoryId
            });
        };
        
        return categoryService;
    }
);