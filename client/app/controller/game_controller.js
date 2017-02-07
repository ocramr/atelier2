angular.module('app').controller('GameController', ['$scope', '$http', 'GameFactory',
    function($scope, $http, GameController){

    $scope.game = {};
    $scope.isPlaying = false;


    $scope.start = function () {
        GameFactory.play({"pseudo" : pseudo, "level": level}).then(function (response) {
            $scope.isPlaying =true;
        }, function (error) {

        });
    };

    $scope.pause = function (pseudo, level) {
        if($scope.game){

        }
    };


}]);
