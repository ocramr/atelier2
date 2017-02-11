angular.module('backoffice').factory('UserFactory', ['$http', 'API_URL', '$localStorage',
    function ($http, API_URL, $localStorage) {
    var config = {headers: {'Authorization': 'Token token=61813703d88b45b48653a1cd3f5673d6',
        'Content-Type': 'application/json'}};

    return {
        register:function (json) {
            return $http.post(API_URL+'user/register', json);
        },
        /*login:function (json) {
            return $http.post(API_URL+'/user/login', json);
        },*/
        login: function (json, callback) {
            $http.post(API_URL+'user/login', json).then(function (response) {
                if (response.data.token) {
                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = {
                        username: response.data.username, token: response.data.token, last_name: response.data.last_name, first_name: response.data.first_name
                    };

                    // add jwt token to auth header for all requests made by the $http service
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                    // execute callback with true to indicate successful login
                    callback(true);
                } else {
                    // execute callback with false to indicate failed login
                    callback(false);
                }
            }, function (error) {
                console.log(error);
            });
        }
        ,

        logout: function (callback) {
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
            var isDeleted = !$localStorage.currentUser;
            callback(isDeleted);
        }
    }

}]);