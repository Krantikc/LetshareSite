(function() {

    angular.module('Letshare').service('svTabsData', [function() {
            var tabs = {
                'home': [
                    'devices'
                ]
            };

            this.screen = function(screenId) {
                return tabs[screenId];
            };

            this.getDefaultTabId = function(screenId) {
                return Object.keys(tabs[screenId])[0];
            };
        }
    ]);


    angular.module('Letshare').factory('genericAPIService', function($http, ENV) {
        var genericAPI = {};

        genericAPI.getObject = function(id, className) {
             return $http({
                method: 'GET',
                url: ENV.api + 'misc/object',
                params: {id: id, class: className}
            });
        }

        return genericAPI;

    });

})();