var app = angular.module("backoffice", ['ngRoute','ngAnimate','ui.bootstrap']);
app.config(function ($routeProvider) {
        $routeProvider
            .when('/',{
                controller : 'HomeController',
                templateUrl : 'templates/home.html'
            })
            .when('/login',{
                controller : 'LoginController',
                templateUrl : 'templates/login.html'
            })
            .when('/register',{
                controller : 'RegisterController',
                templateUrl : 'templates/register.html'
            })
            .otherwise({redirectTo : '/login'});
    });
app.constant('API_URL', 'http://backend.findyourway.local/');


/*
function run($rootScope, $http, $location, $localStorage) {
    // keep user logged in after page refresh
    /*if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }*/

    // redirect to login page if not logged in and trying to access a restricted page
    /*$rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/login');
        }
    });*/
