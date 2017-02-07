angular.module('app').factory('UserFactory', ['$http',function ($http) {
    var config = {headers: {'Authorization': 'Token token=61813703d88b45b48653a1cd3f5673d6',
        'Content-Type': 'application/json'}};

    return {
        register:function (json) {
            return $http.post('http://play.finyourway.local/user/register', json);
        },
        login:function (json) {
            return $http.post('http://play.finyourway.local/user/login', json);
        }
    }

}]);