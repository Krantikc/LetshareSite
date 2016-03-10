angular.module('Letshare').controller('HomeController',
    function($scope, $http, $modal, svLocale) {
        console.log('Home');
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.categories = [{
            value: 0
        },{
            value: 1
        },{
            value: 2
        }];
        
    }
);