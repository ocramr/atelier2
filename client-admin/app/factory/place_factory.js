angular.module('backoffice').factory('PlaceFactory', ['$http', 'API_URL',function ($http, API_URL) {
    var url = API_URL+'places';
    return {
        all:function () {
            return $http.get(url);
        },
        update: function (id, json) {
            return $http.put(url+'/'+id, json);
        },
        add: function (json) {
            return $http.post(url, json);
        }
    }

}]);