
angular.module('Letshare').controller('UserController', ['$scope', '$http', 'svLocale', 'userAPIService', 
    function($scope, $http, svLocale, userAPIService) {
 
        $scope.registerUser = function() {
            userAPIService
                .addUser($scope.user)
                    .success(function(response) {
                        //$scope.postsList = response.posts;
                        console.log('success');
                    });
        };
        
                
        $scope.doLogout = function() {
            delete window.sessionStorage;
            $state.go('login');
        };
        
    }
    
        
]);

angular.module('Letshare').controller('SessionController', ['$scope', '$http', 'svLocale', '$state',
    function($scope, $http, svLocale, $state) {
        
        $scope.doLogout();
        $scope.doLogout = function() {
            delete window.sessionStorage;
            $state.go('login');
        };
        
    }
    
        
]);