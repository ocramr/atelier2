angular.module('backoffice').factory('LevelFactory', ['$http', 'API_URL',function ($http, API_URL) {
    var url = API_URL+'levels';
    return {
        all:function () {
            return $http.get(url);
        },
        update: function (id, json) {
            return $http.put(url+'/'+id, json);
        },
    }

}]);