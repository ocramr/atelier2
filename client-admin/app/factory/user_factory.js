angular.module('backoffice').factory('UserFactory', ['$http', 'API_URL',function ($http, API_URL) {
    var config = {headers: {'Authorization': 'Token token=61813703d88b45b48653a1cd3f5673d6',
        'Content-Type': 'application/json'}};

    return {
        register:function (json) {
            return $http.post(API_URL+'user/register', json);
        },
        login:function (json) {
            return $http.post(API_URL+'/user/login', json);
        }
    }

}]);