angular.module('app').controller('GameController', ['$scope', '$http', 'Game','GameFactory', 'LevelFactory','DataService', '$rootScope',
    function($scope, $http, Game, GameFactory, LevelFactory, DataService, $rootScope){

        $scope.levels = [];
        $scope.position = 0;
        $scope.markers = [];
        $scope.paths = [];
        $scope.ranking = [];
        initValues();

        function initValues() {
            $scope.newGame={};
            $scope.markers = [];
            $scope.paths = [];
            $scope.position = 0;
            $rootScope.position = $scope.position;
            DataService.reset();
        }

        $scope.pauseOrResume = function () {
            if ($scope.game.isPlaying) {
                $scope.game.isPlaying = false;
                localStorage.setItem("findYourWay", JSON.stringify($scope.game));
                angular.element('#pauseModal').modal('show');
            } else {
                var game = JSON.parse(localStorage.getItem("findYourWay"));
                if (game) {
                    $scope.game = game;
                    $scope.game.isPlaying = true;
                    localStorage.removeItem("findYourWay");
                    angular.element('#pauseModal').modal('hide');
                }
            }
        }
        $scope.start = function () {
            if($scope.newGame.pseudo && $scope.newGame.level){
                GameFactory.play({"pseudo" : $scope.newGame.pseudo, "level": $scope.newGame.level}).then(function (response) {
                    angular.element('#myModal').modal('hide');
                    initValues();
                    $scope.game = new Game(response.data);
                    DataService.listPlaces($scope.game.places);
                    DataService.listDestination($scope.game.destination);
                    $scope.$broadcast('timer-reset');
                    $scope.countdownVal = parseInt($scope.game.level.time);
                    $scope.$broadcast('timer-start');
                }, function (error) {
                    console.log(error);
                });
            }

        };
        $scope.ranking = function () {
            GameFactory.ranking().then(function(response){
                $scope.ranking = response.data;
            },function(error){
                console.log(error)
            })
        };
        $scope.finishGame = function (score, duration) {
            GameFactory.finish($scope.game.id, {"score": score, "duration": duration}, $scope.game.token)
                .then(function (data) {
                    $scope.game = undefined;
                    DataService.reset();
                }, function (error) {
                    console.log("error")
                });
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
        };
        $scope.$on('timer-tick', function (event, data) {
            if(data.timerElement.innerHTML == "0")
            {
                angular.element('#gameover').modal('show');
            }
        });

        $scope.$on("leafletDirectiveMap.click", function(event, args){
            if ($scope.game && $scope.game.isPlaying) {
                //Get lat and lng of the clicked place
                clicked_lat = args.leafletEvent.latlng.lat;
                clicked_lng = args.leafletEvent.latlng.lng;

                if($scope.position < 5)
                {

                    //Get lat and lng du lieu récupérer de la bd
                    lat2 = $scope.game.places[$scope.position].lat;
                    lng2 = $scope.game.places[$scope.position].lng;

                    //Calculer la distance entre les deux lieux
                    d = distance(clicked_lat,parseFloat(lat2),clicked_lng,parseFloat(lng2))


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
                                    color: 'green',
                                    weight: 4,
                                    latlngs: $scope.markers,
                                }
                            }
                        }
                    }else
                    {
                        console.log('Réessayez')
                    }
                }
                console.log($scope.position)
                if($scope.position == 5)
                {
                    lat2 = $scope.game.destination.lat;
                    lng2 = $scope.game.destination.lng;

                    //Calculer la distance entre les deux lieux
                    d = distance(clicked_lat,parseFloat(lat2),clicked_lng,parseFloat(lng2))
                    if(d < $scope.game.level.distance)
                    {
                        score = 10;
                        $scope.markers.push({
                            lat: parseFloat(lat2),
                            lng: parseFloat(lng2),
                            icon : {
                                iconUrl: 'https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo2-19-512.png',
                                iconSize:     [60, 60],
                            }
                        });
                        $scope.paths = {
                            p1: {
                                color: 'green',
                                weight: 4,
                                latlngs: $scope.markers,
                            }
                        }
                    }
                    if(d < 2 * $scope.game.level.distance)
                    {
                        score = 8;
                    }
                    if(d < 3 * $scope.game.level.distance)
                    {
                        score = 6;
                    }
                    if(d < 5 * $scope.game.level.distance)
                    {
                        score = 3;
                    }
                    if(d < 10 * $scope.game.level.distance)
                    {
                        score = 1;
                    }
                    $scope.$on('timer-tick', function (event, data) {
                        var duration = $scope.game.level.time - data.timerElement.innerHTML;
                        if(score != "" && duration != ""){
                            $scope.finishGame(score,duration);
                        }
                        $scope.$broadcast('timer-stop');
                    });

                }
            }
        });
        $scope.hide_gameover_modal = function()
        {
            angular.element('#gameover').modal('hide');
        };
        $scope.init();
    }]);