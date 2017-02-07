angular.module('app').factory('LevelFactory', ['$http',function ($http) {
    return {
        all:function () {
            return $http.get('http://backend.findyourway.local/levels');
        }
    }
}]);