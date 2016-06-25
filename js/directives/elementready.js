angular.module('Letshare').directive('elementready', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
        	element.ready(function() {
                if(attrs.elementready!=='') {
                    scope.$apply(attrs.elementready);
                }
            });
        }
    }
    
});
