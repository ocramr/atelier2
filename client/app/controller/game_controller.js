angular.module('app').controller('GameController', ['$scope', '$http', 'GameFactory',
    function($scope, $http, GameFactory){

    $scope.game = {};

    $scope.start = function (pseudo, level) {
        GameFactory.play({"pseudo" : pseudo, "level": level}).then(function (response) {
            var game = new Game(response.data);
            console.log(game);
        }, function (error) {
            console.log(error);
        });
    };

    $scope.pauseOrResume = function () {
        if($scope.game.isPlaying){
            $scope.game.isPlaying = false;
            localStorage.setItem("findYourWay", JSON.stringify($scope.game));
        }else{
            var game = JSON.parse(localStorage.getItem("findYourWay"));
            if(game)    {
                $scope.game = game;
                $scope.game.isPlaying = true;
                localStorage.removeItem("findYourWay");
            }
        }
    };

    $scope.finishGame = function () {

    };


}]);
