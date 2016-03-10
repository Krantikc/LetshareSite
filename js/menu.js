angular.module('Letshare').controller('Menu', ['$scope', '$rootScope', '$stateParams', '$http', '$location',
    '$state', 'svTabsData', '$document', 'svLocale', '_',
    function($scope, $rootScope, $stateParams, $http, $location, $state, svTabsData,
        $document, svLocale, _) {

        $scope.menuType = 'task';

        $scope.setCurrentState = function() {
            $scope.currentState = $state.current.name;
        };

        $scope.setCurrentState();
        $rootScope.$on('$stateChangeSuccess', $scope.setCurrentState);
        $scope.inState = function(state) {
            if (state === 'view') {
                return $scope.currentState.indexOf('monitor') === 0 ||
                    $scope.currentState.indexOf('report') === 0 ||
                    $scope.currentState.indexOf('tools') === 0;
            }
            return $scope.currentState.indexOf(state) === 0;
        };

        $scope.svLocale = svLocale;

        $scope.home = svLocale.translate('home');
        $scope.view = svLocale.translate('view');
        $scope.control = svLocale.translate('control');
        $scope.monitor = svLocale.translate('monitor');
        $scope.report = svLocale.translate('report');
        $scope.manage = svLocale.translate('manage');
        $scope.tools = svLocale.translate('tools');
        $scope.settings = svLocale.translate('settings');
        $scope.translation = svLocale.getSelectedLanguage().value.substring(0, 2);

        $scope.homeScreenId = 'home';
        $scope.defaultTabId = svTabsData.getDefaultTabId($scope.homeScreenId);
        $scope.tabs = svTabsData.screen($scope.homeScreenId);

        $scope.languages = svLocale.getLocales();
        $scope.selected = svLocale.getSelectedLanguage();

        $scope.languageChanged = function(language) {
            svLocale.setSelectedLanguage(language);
        };

        $scope.bindClick = function(event) {
            var $trigger = angular.element(document.querySelector('#sv-main-menu-container'));
            if (!$trigger[0].contains(event.target)) {
                var myEl = angular.element(document.querySelector('#sv-navbar'));
                myEl.removeClass('in');
            }
        };

        $document.bind('click', $scope.bindClick);

    }
]);

angular.module('Letshare').directive('resize', function($window) {
    return function(scope) {
        var w = angular.element($window);
        scope.getWindowDimensions = function() {
            return {
                'w': angular.element($window)[0].innerWidth,
                'h': angular.element($window)[0].innerHeight,
            };
        };
        scope.$watch(scope.getWindowDimensions, function(newValue) {
            scope.windowHeight = angular.element($window)[0].innerWidth;
            scope.windowWidth = newValue.w;
            var myEl = angular.element(document.querySelector('#sv-navbar'));
            if (scope.windowHeight > 768) {
                myEl.removeClass('in');
            }
        }, true);

        w.bind('resize', function() {
            scope.$apply();
        });
    };
});

angular.module('Letshare').directive('navbar', function($rootScope) {
    function link(scope, element) {
        var $element = $(element);
        $rootScope.$on('$stateChangeStart', function() {
            $element.collapse('hide');
        });
    }
    return {
        link: link
    };
});
