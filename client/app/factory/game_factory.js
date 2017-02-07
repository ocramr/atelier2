angular.module('app').factory('GameFactory', ['$http',function ($http) {
    var config = {headers: {'Authorization': 'Token 61813703d88b45b48653a1cd3f5673d6',
        'Content-Type': 'application/json'}};

    

    return {
        play:function (json) {
            return $http.post('http://play.finyourway.local/game/play', json);
        },
        finish:function (id, json) {
            return $http.put('http://play.finyourway.local/game/save/'+id, json);
        },
        ranking: function () {
            return $http.get('http://play.finyourway.local/game/ranking');
        }
    }

}]);