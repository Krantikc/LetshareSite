(function() {
    var vm = this;
    angular.module('Letshare').controller('LoginController', 
        function($scope, $rootScope, $state, LoginService, authAPIService) {
            console.log('login');
            var DEFAULT_REDIRECT = 'posts';
            $scope.formValid = true;
            //var currentUser = LoginService.loginCheck();
            if($rootScope.currentUser) {
                $state.go('home');
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
            
            $scope.doLogin = function() {
                var isFormValid = validateForm($scope.loginForm);
                if (isFormValid) {
                    $scope.errorMsg = '';
                    authAPIService
                    .authenticateUser($scope.user.username, $scope.user.password)
                    .then(function(response) {
                        var result = response.data;
                        if(result.success) {
                            window.localStorage.setItem('currentUser', JSON.stringify(result.user));
                            window.localStorage.setItem('loggedIn', true);
                            window.localStorage.setItem('token', result.token);
                            $rootScope.currentUser = result.user;
                            
                            if ($rootScope.redirectTo) {
                                $state.go($rootScope.redirectTo);
                            } else {
                                $state.go(DEFAULT_REDIRECT);
                            }
                        } else {
                            $scope.errorMsg = 'Invalid username or password';//result.message;
                        }
                    }, function() {
                        console.log('ERROR');
                    });
                }
                
            };

            
            
    });

    angular.module('Letshare').service('LoginService', function($state, $rootScope, authAPIService) {
        var vm = this;
        
        vm.loginCheck = function() {
            if (window.localStorage && window.localStorage.getItem('loggedIn')) {
                var currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
                authAPIService.validateUserSession(currentUser).then(function(response) {
                    var result = response.data;
                    if (!result.validSession) {
                        $rootScope.currentUser = null;
                        window.localStorage.setItem('currentUser', null);
                        $state.go('login');
                    } else {
                        $rootScope.currentUser = currentUser;
                    }
                });
                return currentUser;
            }
            return null;
        }

    });

    angular.module('Letshare').factory('authAPIService', function($http, ENV) {
        var authService = {};
        authService.authenticateUser = function(email, password) {
            return $http({
                    method: 'POST',
                    url: ENV.api + 'user/auth',
                    data: {email: email, password: password},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'prelogin'
                    },
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            
                        return str.join("&");
                    }
                });
        };
        
        authService.validateUserSession = function(user) {
            return $http({
                    method: 'POST',
                    url: ENV.api + 'user/validatesession',
                    data: user
                });
        };
        
        return authService; 
    });
    
})();
