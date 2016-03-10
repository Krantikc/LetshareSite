var app = angular.module('app', ['app.config', 'ui.router', 'ngResource', 'Letshare', 'ui.bootstrap', 'underscore']);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
        //unmactched URLs return to monitor page
        $urlRouterProvider.otherwise('/en/home');
        $urlRouterProvider.when('/en/posts', '/en/posts/list');
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/{lang:(?:en|ko)}',
                templateUrl: 'partials/app.html'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'partials/home.html',
                controller: 'HomeController',
                parent: 'app'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login.html',
                controller: 'LoginController',
                parent: 'app'
            })
            .state('user', {
                url: '/user',
                templateUrl: 'partials/user.html',
                controller: 'UserController',
                parent: 'app'
            })
           .state('user.register', {
                url: '/register',
                templateUrl: 'partials/user/user-register.html',
                controller: 'UserController',
                parent: 'user'
            })
            .state('user.logout', {
                url: '/logout',
                controller: 'SessionController',
                parent: 'user'
            })
            .state('posts', {
                url: '/posts',
                templateUrl: 'partials/posts.html',
                parent: 'app',
                authenticate: true
            })
            .state('posts.list', {
                url: '/list',
                templateUrl: 'partials/posts/posts-list.html',
                controller: 'PostsController',
                parent: 'posts',
                authenticate: true
            })
            .state('posts.new', {
                url: '/new',
                templateUrl: 'partials/posts/posts-new.html',
                controller: 'PostsController',
                parent: 'posts',
                authenticate: true
            })
            .state('posts.details', {
                url: '/:id',
                templateUrl: 'partials/posts/posts-details.html',
                controller: 'PostsController',
                parent: 'posts',
                authenticate: true
            });
            
            $httpProvider.interceptors.push('authInterceptor');

        //$locationProvider.html5Mode(true);

    }]);

    app.run(['$rootScope', '$state', '$location', 'LoginService', function($rootScope, $state, $location, LoginService) {
        $rootScope.$on('$stateChangeStart', function(evt, to, params) {
          var isLoggedIn = LoginService.loginCheck();
          if (isLoggedIn === 'true' && to.name === 'login') {
            evt.preventDefault();
          }
          
          if (to.authenticate) {
              //return;
              
              if (isLoggedIn !== 'true') {
                evt.preventDefault();
                $rootScope.redirectTo = to;
                $state.go('login', params);
              } 
          }
          
          
        });
    }]);

angular.module('Letshare', ['app.config', 'ui.router', 'ui.bootstrap',
    'isteven-multi-select']);
