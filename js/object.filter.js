
angular.module('Letshare').filter('object',
    function($http, ENV) {
        
        return function(input, option) {
            var objId = input, className = option;


            var promise =  $http({
                method: 'GET',
                url: ENV.api + 'misc/object',
                params: {id: objId, class: className}
            });

            promise.then(function(response) {
            	return response.data.object.name;
            });


            
        }


    });