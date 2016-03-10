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
                        window.sessionStorage.setItem('currentUser', result.user);
                        window.sessionStorage.setItem('loggedIn', true);
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

angular.module('Letshare').service('LoginService', function($state) {
    var vm = this;
    
    vm.loginCheck = function() {
        if (window.sessionStorage && window.sessionStorage.getItem('loggedIn')) {
            return window.sessionStorage.getItem('loggedIn');
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
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        
                    return str.join("&");
                }
            });
    }
    return authService; 
});
