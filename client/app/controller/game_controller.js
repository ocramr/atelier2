angular.module('app').controller('GameController', ['$scope', '$http', 'Game','GameFactory', 'LevelFactory','DataService', '$rootScope',
    function($scope, $http, Game, GameFactory, LevelFactory, DataService, $rootScope){

    $scope.newGame ={};
    $scope.levels = [];
    $scope.position = 0;
    $scope.markers = new Array();
    $scope.paths = new Array();
    $scope.ranking = [];
    $rootScope.position = $scope.position;
    
    $scope.start = function () {
        if($scope.newGame.pseudo && $scope.newGame.level){
            GameFactory.play({"pseudo" : $scope.newGame.pseudo, "level": $scope.newGame.level}).then(function (response) {
                angular.element('#myModal').modal('hide');
                $scope.newGame={};
                $scope.game = new Game(response.data);
                DataService.listPlaces($scope.game.places);
                DataService.listDestination($scope.game.destination);
            }, function (error) {
                console.log(error);
            });
        }

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

    $scope.ranking = function () {
       GameFactory.ranking().then(function(response){
           $scope.ranking = response.data;
       },function(error){
           console.log(error)
       })
    };

    $scope.finishGame = function () {
        GameFactory.finish($scope.game.id, {"score": $scope.game.score, "duration": $scope.game.duration})
            .then(function (data) {
                $scope.game = undefined;
                DataService.reset();
            }, function (error) {
                console.log(error)
            })
    };

        $scope.init = function () {
            angular.extend($scope, {
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
            if(!$scope.levels || $scope.levels.length == 0) {
                LevelFactory.all().then(function (response) {
                    $scope.levels = response.data;
                }, function (error) {
                    console.log(error);
                });
            }

            $scope.$on("leafletDirectiveMap.click", function(event, args){

                if ($scope.game && $scope.game.isPlaying) {
                    //Get lat and lng of the clicked place
                    clicked_lat = args.leafletEvent.latlng.lat;
                    clicked_lng = args.leafletEvent.latlng.lng;

                    //Get lat and lng du lieu récupérer de la bd
                    lat2 = $scope.game.places[$scope.position].lat;
                    lng2 = $scope.game.places[$scope.position].lng;

                    //Calculer la distance entre les deux lieux
                    d = distance(clicked_lat,parseInt(lat2),clicked_lng,parseInt(lng2))

                    if(d <= $scope.game.level.distance)
                    {
                        $scope.position++;
                        $rootScope.position = $scope.position;
                        $scope.markers.push({
                            lat: parseFloat(lat2),
                            lng: parseFloat(lng2)
                        });
                        if($scope.position > 1)
                            {
                                $scope.paths = {
                                                p1: {
                                                    color: 'red',
                                                    weight: 6,
                                                    latlngs: $scope.markers,
                                                    }
                                                }
                            }
                    }
                    else
                    {
                        console.log('Réessayez')
                    }

                }});
        };

    $scope.init();  
}]);