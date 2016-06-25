angular.module('Letshare').directive('itemDisable', function() {
    return {
        restrict: 'AEC',
        template: '<div class="wrapper"></div>',
        transclude: true
    }
    
});
