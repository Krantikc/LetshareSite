angular.module('Letshare').controller('Header', ['$scope', 'svLocale',
    function($scope, svLocale) {

        $scope.languages = svLocale.getLocales();
        $scope.selected = svLocale.getSelectedLanguage();

        $scope.languageChanged = function(language) {
            svLocale.setSelectedLanguage(language);
        };
    }
]);
