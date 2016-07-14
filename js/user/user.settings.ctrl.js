
angular.module('Letshare').controller('UserSettingsController',
    function($rootScope, $scope, $http, svLocale, userSettingsAPIService) {
 
        $scope.currentPassword = '';
        $scope.newPassword = '';
        $scope.confirmPassword = '';

        $scope.getUser = function() {
            var currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
            userSettingsAPIService.getUserById(currentUser.userId).then(function(response) {
                var result = response.data;
                if (result.success) {
                    $scope.user = result.user;
                }
                
            }, function() {
                console.log('ERROR');
            })
        };

        $scope.updateUser = function() {
            if ($scope.userForm.$valid) {

                $scope.successMsg = null;
                $scope.errorMsg = null;
                userSettingsAPIService.updateUser($scope.user).then(function(response) {
                    var result = response.data;
                    if (result.success) {
                        $scope.successMsg = 'User profile updated successfully';
                    } else {
                        $scope.errorMsg = result.message;
                    }
                }, function() {
                    console.log('ERROR');
                });
            }
            
        };

        $scope.changeUserPassword = function() {
            if ($scope.passwordForm.$valid) {
                var currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
                var user = {
                    userId: currentUser.userId,
                    currentPassword: $scope.currentPassword,
                    newPassword: $scope.newPassword
                };


                $scope.pwdSuccessMsg = null;
                $scope.pwdErrorMsg = null;
                userSettingsAPIService
                    .changeUserPassword(user)
                    .then(function(response) {
                        var result = response.data;
                        if (result.success) {
                            $scope.pwdSuccessMsg = result.msg;
                        } else {
                            $scope.pwdErrorMsg = result.msg;
                        }
                        console.log('success');
                    }, function() {
                        console.log('ERROR');
                    });
            }
            
        };

        $scope.getUser();


    });