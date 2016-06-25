
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
                userSettingsAPIService.updateUser($scope.user).then(function(response) {
                    console.log('success');
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

                userSettingsAPIService
                    .changeUserPassword(user)
                    .then(function(response) {
                        console.log('success');
                    }, function() {
                        console.log('ERROR');
                    });
            }
            
        };

        $scope.getUser();


    });