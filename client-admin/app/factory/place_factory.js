angular.module('backoffice').factory('PlaceFactory', ['$http', 'API_URL',function ($http, API_URL) {

    return {
        all:function () {
            return $http.get(API_URL+'places');
        }
    }

}]);