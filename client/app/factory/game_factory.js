angular.module('app').factory('GameFactory', ['API_URL','$http',function (API_URL, $http) {

    function setConfigToken(token)
    {
        var config = {
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/json'
            }
        };
        return config;
    }

    return {
        play:function (json) {
            return $http.post(API_URL+'game/play', json);
        },
        finish:function (id, json, token)
        {
            return $http.put(API_URL+'game/'+id+'/save', json, setConfigToken(token));
        },
        ranking: function () {
            return $http.get(API_URL+'game/ranking');
        }
    }

}]);