angular.module('app').controller('GameController', ['$scope', '$http', 'GameFactory', 'LevelFactory',
    function($scope, $http, GameFactory, LevelFactory){

    $scope.game = {};
    $scope.levels = [];

    LevelFactory.all().then(function(response){
        $scope.levels = response.data;
    },function(error){
        console.log(error)
    });

    $scope.start = function () {
        console.log($scope.game.pseudo);
        /*GameFactory.play({"pseudo" : pseudo, "level": level}).then(function (response) {
         var game = new Game(response.data);
         console.log(game);
         }, function (error) {
         console.log(error);
         });*/
    };

    $scope.pauseOrResume = function () {
        if ($scope.game.isPlaying) {
            $scope.game.isPlaying = false;
            localStorage.setItem("findYourWay", JSON.stringify($scope.game));
        } else {
            var game = JSON.parse(localStorage.getItem("findYourWay"));
            if (game) {
                $scope.game = game;
                $scope.game.isPlaying = true;
                localStorage.removeItem("findYourWay");
            }
        }
    };

    $scope.finishGame = function () {
        GameFactory.finish($scope.game.id, {"score": $scope.game.score, "duration": $scope.game.duration})
            .then(function (data) {
                console.log(data)
            }, function (error) {
                console.log(error)
            })
    };

    $scope.init = function () {
        angular.extend($scope, {
            markers: {},
            europeanPaths: {},
            events: {
                map: {
                    enable: ['click', 'drag', 'blur', 'touchstart', 'moveend'],
                    logic: 'emit'
                }
            },
            cen: {
                lat: 47.282448,
                lng: 1.883957,
                zoom: 6
            }
        });

        LevelFactory.all().then(function (response) {
            console.log(response.data);
        }, function (error) {
           console.log(error);
        });
    };

    $scope.$on('leafletDirectiveMap.click', function (event, args) {
        $scope.clicked_lat = args.leafletEvent.latlng.lat;
        $scope.clicked_lng = args.leafletEvent.latlng.lng;

        console.log(distance($scope.clicked_lat, 49.28214015975995, $scope.clicked_lng, 3.438720703125))
    });

    $scope.init();
}]);
