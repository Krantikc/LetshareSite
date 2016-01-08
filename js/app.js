var app = angular.module('app', ['app.config', 'ui.router', 'ngResource', 'CloudServices',
     'luegg.directives', 'uiGmapgoogle-maps']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        //unmactched URLs return to monitor page
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('view', {
                url: '/view',
                templateUrl: 'partials/view.html',
                controller: 'View',
                parent: 'app'
            })
            .state('app', {
                abstract: true,
                url: '/{lang:(?:en|ko)}',
                templateUrl: 'partials/app.html'
            })
           .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        });

        //Set Highcharts to use UTC globally
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        //$locationProvider.html5Mode(true);

    }]);

angular.module('CloudServices', ['app.config', 'ui.router', 'ui.bootstrap',
    'isteven-multi-select', 'uiGmapgoogle-maps']);
