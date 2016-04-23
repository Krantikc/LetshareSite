angular.module('Letshare').controller('LoginController', function($scope, $rootScope, $state, LoginService, authAPIService) {
        console.log('login');
        var DEFAULT_REDIRECT = 'posts';
        
        var isLoggedIn = LoginService.loginCheck();
        if(isLoggedIn === 'true') {
            $state.go('home');
        }
        
        $scope.doLogin = function() {
            authAPIService
                .authenticateUser($scope.user.username, $scope.user.password)
                .then(function(response) {
                    var result = response.data;
                    if(result.success) {
                        window.localStorage.setItem('currentUser', JSON.stringify(result.user));
                        window.localStorage.setItem('loggedIn', true);
                        window.localStorage.setItem('token', result.token);
                    }
                    if ($rootScope.redirectTo) {
                        $state.go($rootScope.redirectTo);
                    } else {
                        $state.go(DEFAULT_REDIRECT);
                    }
                }, function() {
                    console.log('ERROR');
                });
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
                    $state.go('login');
                } else {
                    $rootScope.currentUser = currentUser;
                }
            });
            return currentUser;
        }
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
