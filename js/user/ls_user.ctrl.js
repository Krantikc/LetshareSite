
angular.module('Letshare').controller('UserController', ['$rootScope', '$scope', '$http', 'svLocale', 'userAPIService', '$state',
    function($rootScope, $scope, $http, svLocale, userAPIService, $state) {
 
        $scope.registerUser = function() {
            userAPIService
                .addUser($scope.user)
                    .success(function(response) {
                        //$scope.postsList = response.posts;
                        console.log('success');
                    });
        };
        
                
        $scope.doLogout = function() {
            delete window.localStorage.currentUser;
            delete window.localStorage.loggedIn;
            delete window.localStorage.token;
            $rootScope.currentUser = {};
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