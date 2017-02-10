<<<<<<< HEAD
var app = angular.module("backoffice", ['ngAnimate','ui.bootstrap', 'ui.router', 'ngTable', 'ngStorage', 'naif.base64']);
app.constant('API_URL', '/atelier2/api/rest/');
=======
var app = angular.module("backoffice", ['ngAnimate', 'ui.router','angularModalService', 'ngStorage', 'naif.base64']);
app.constant('API_URL', 'http://backend.findyourway.local/');
>>>>>>> abc8fc969440106a974ddcfa0b766d2eb31d7654
app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    //Default route
    $urlRouterProvider.otherwise('/home');

    //Routeur à partir de /home#{view}
    $stateProvider.state(
        'home', {
            url: '/home', templateUrl: 'app/templates/home.html', controller: 'HomeController'
        })
        .state('home.destination',{
            url: '/destination', templateUrl: 'app/templates/destination.html', controller: 'DestinationController'
        })
        .state('home.places',{
            url: '/places', templateUrl: 'app/templates/places.html', controller: 'PlaceController'
        })
        .state('home.levels',{
            url: '/levels', templateUrl: 'app/templates/levels.html', controller: 'LevelController'
        })
        .state('home.settings',{
            url: '/settings', templateUrl: 'app/templates/settings.html', controller: 'SettingsController'
        })
            .state('login',{
                url: '/login', templateUrl: 'app/templates/login.html', controller: 'LoginController'
            })
        .state('register',{
            url: '/register', templateUrl: 'app/templates/register.html', controller: 'RegisterController'
        });

    $httpProvider.interceptors.push('httpRequestInterceptor');

});
app.run(run);


app.factory('httpRequestInterceptor', ['$rootScope', '$localStorage', function ($rootScope, $localStorage) {

    return {
        request: function ($config) {
                if($localStorage.currentUser){
                    $config.headers['Authorization'] = 'Bearer ' + $localStorage.currentUser.token;
                }
            return $config;
        }
    };
}]);



function run($rootScope, $http, $location, $localStorage) {
    // keep user logged in after page refresh
    if ($localStorage.currentUser) {

        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/login','/register'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/login');
        }
    });
}
