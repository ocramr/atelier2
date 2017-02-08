angular.module('app').factory('LevelFactory', ['API_URL','$http',function (API_URL, $http) {
    return {
        all:function () {
            return $http.get(API_URL+'levels');
        }
    }
}]);