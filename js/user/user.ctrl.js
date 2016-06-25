
angular.module('Letshare').controller('UserController', ['$rootScope', '$scope', '$http', 'svLocale', 'userAPIService', '$state',
    function($rootScope, $scope, $http, svLocale, userAPIService, $state) {
        $scope.formValid = true;
        
        function failureHandler(error) {
            console.error('Error in XHR. ' + error.data);
        }
        function validateForm(form) {
            if (form.$valid) {
                $scope.formValid = true;
                return true;
            } else {
                $scope.formValid = false;
                return false;
            }
        }
        $scope.registerUser = function() {
            var isFormValid = validateForm($scope.registerForm);
            if (isFormValid) {
                $scope.successMsg = '';
                $scope.errorMsg = '';
                userAPIService
                .addUser($scope.user)
                    .then(function(response) {
                        var result = response.data;
                        if (result.success) {
                            $scope.user = null;
                            $scope.registerForm.$setPristine();
                            $scope.successMsg = 'Thank you for registering. Please login to continue.';
                        } else {
                            $scope.errorMsg = result.message;
                        }
                        //$scope.postsList = response.posts;
                        console.log('success');
                    }, failureHandler);
            }
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