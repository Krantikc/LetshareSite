var app = angular.module('app', ['app.config', 'ui.router', 'ngResource', 'Letshare', 'ui.bootstrap', 'underscore']);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', 
        function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
        //unmactched URLs return to monitor page
        $urlRouterProvider.otherwise('/home');
        $urlRouterProvider.when('/posts', '/posts/list');
        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: 'partials/app.html'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'partials/home.html',
                controller: 'HomeController',
                parent: 'app',
                authenticate: false
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
                params: {
                    cityId: 0,
                    searchTitle: '',
                    categoryId: 0
                },
                parent: 'app',
                authenticate: false
            })
            .state('posts.list', {
                url: '/list',
                params: {
                    cityId: 0,
                    searchTitle: '',
                    categoryId: 0
                },
                templateUrl: 'partials/posts/posts-list.html',
                controller: 'PostsController',
                parent: 'posts',
                authenticate: false
            })
            .state('posts.new', {
                url: '/new',
                templateUrl: 'partials/posts/posts-new.html',
                controller: 'PostsNewController',
                parent: 'posts',
                authenticate: true
            })
            .state('posts.details', {
                url: '/:id',
                templateUrl: 'partials/posts/posts-details.html',
                controller: 'PostsDetailsController',
                parent: 'posts',
                authenticate: false
            });
            
            $httpProvider.interceptors.push('authInterceptor');
            
            $httpProvider.defaults.withCredentials = true;

            $locationProvider.html5Mode(true);

    }]);

    app.run(['$rootScope',  '$state', '$location', 'LoginService', function($rootScope,  $state, $location, LoginService) {
        $rootScope.$on('$stateChangeStart', function(evt, to, params) {
            $rootScope.currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
            if (to.authenticate) {
                $rootScope.currentUser = LoginService.loginCheck();

                $rootScope.$watch('currentUser',function(newVal, oldVal) {
                    if ($rootScope.currentUser != null && to.name === 'login') {
                        evt.preventDefault();
                    }
                  
                    if ($rootScope.currentUser == null) {
                        evt.preventDefault();
                        $rootScope.redirectTo = to;
                        $state.go('login', params);
                    } 
                });
            }
        });
    }]);

angular.module('Letshare', ['app.config', 'ui.router', 'ui.bootstrap',
    'isteven-multi-select', 'ngFileUpload', 'ngIdle', 'angucomplete-alt']);
