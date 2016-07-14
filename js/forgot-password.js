(function() {
    var vm = this;
    angular.module('Letshare').controller('ForgotPasswordController', 
        function($scope, $rootScope, $state, passwordAPIService) {
           
           function validateForm(form) {
                if (form.$valid) {
                    $scope.formValid = true;
                    return true;
                }
                
                $scope.formValid = false;
                return false;
            }
            
            $scope.resetPassword = function() {
                var isFormValid = validateForm($scope.resetPasswordForm);
                if (isFormValid) {
                    $scope.errorMsg = '';
                    passwordAPIService
                    .resetPassword($scope.user.email)
                    .then(function(response) {
                        var result = response.data;
                        if(result.success) {
                            
                            $scope.successMsg = result.msg;
                        
                        } else {
                            $scope.errorMsg = result.msg;
                        }
                    }, function() {
                        console.log('ERROR');
                    });
                }
                
            };

            
            
    });

    
    angular.module('Letshare').factory('passwordAPIService',
        function($http, ENV) {
            
            var passwordService = {};
            
                
            passwordService.resetPassword = function(email) {
                return $http({
                    method: 'GET',
                    url: ENV.api + 'user/reset',
                    params: {email: email},
                    headers: {
                        'Authorization': 'prelogin'
                    }
                });
            };

            
            return passwordService;
        });
})();
