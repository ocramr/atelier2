var app = angular.module("backoffice", ['ngAnimate', 'ui.router','angularModalService', 'ngStorage', 'naif.base64']);
app.constant('API_URL', 'http://backend.findyourway.local/');
app.filter('num', function() {
    return function(input) {
        return parseInt(input, 10);
    };
});
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


app.factory('httpRequestInterceptor', ['$rootScope', '$localStorage','$location', function ($rootScope, $localStorage,$location) {

    return {
        request: function ($config) {
                if($localStorage.currentUser){
                    $config.headers['Authorization'] = 'Bearer ' + $localStorage.currentUser.token;
                }
            return $config;
        }, responseError: function (rejection) {
            console.log(rejection.status);
            if(rejection.status == 401) {
                delete $localStorage.currentUser;
                if(!$localStorage.currentUser)
                    $location.url('/login');
            }
            return rejection;
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
        if (restrictedPage && (!$localStorage.currentUser)) {
            $location.url('/login');
        }
    });
}
