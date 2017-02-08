angular.module("backoffice", ['ngRoute'])
    .config(config)
    .run(run)
    .constant('API_URL', 'http://backend.findyourway.local/');

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/',{
            controller : 'controller/HomeController',
            templateUrl : 'templates/home.html'
            })
        .when('/login',{
            controller : 'controller/LoginController',
            templateUrl : 'templates/login.html'
        })
        .when('/register',{
            controller : 'controller/RegisterController',
            templateUrl : 'templates/register.html'
        })
        .otherwise({redirectTo : '/login'});

     function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
}
