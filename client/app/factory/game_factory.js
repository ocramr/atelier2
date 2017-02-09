angular.module('app').factory('GameFactory', ['API_URL','$http',function (API_URL, $http) {
    var config = {headers: {'Authorization': 'Token 61813703d88b45b48653a1cd3f5673d6',
        'Content-Type': 'application/json'}};

    

    return {
        play:function (json) {
            return $http.post(API_URL+'game/play', json);
        },
        finish:function (id, json) {
            console.log(json)
            return $http.put(API_URL+'game/'+id+'/save', json);
        },
        ranking: function () {
            return $http.get(API_URL+'game/ranking');
        }
    }

}]);