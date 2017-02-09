angular.module('backoffice').factory('DestinationFactory', ['$http','API_URL',function ($http, API_URL) {

    return {
        all:function () {
            return $http.get(API_URL+'destinations');
        }
    }

}]);