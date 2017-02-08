angular.module('app').controller('GameController', ['$scope', '$http', 'Game','GameFactory', 'LevelFactory','DataService',
    function($scope, $http, Game, GameFactory, LevelFactory, DataService){

    $scope.newGame ={};
    $scope.levels = [];

    $scope.start = function () {
        if($scope.newGame.pseudo && $scope.newGame.level){
            GameFactory.play({"pseudo" : $scope.newGame.pseudo, "level": $scope.newGame.level}).then(function (response) {
                angular.element('#myModal').modal('hide');
                $scope.newGame={};
                $scope.game = new Game(response.data);
                DataService.listPlaces($scope.game.places);
                DataService.listDestination($scope.game.destination);
                console.log($scope.game);
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
        if(!$scope.levels || $scope.levels.length == 0) {
            LevelFactory.all().then(function (response) {
                $scope.levels = response.data;
            }, function (error) {
                console.log(error);
            });
            //test
            /*$scope.game = new Game({
                "id_game": 26,
                "token": "za3m9bxudw3lwgxp4fxfhsg8ql3394pd",
                "pseudo": "test",
                "level": {
                    "id": 1,
                    "max_attempts": "20",
                    "distance": "500",
                    "time": "1000"
                },
                "destination": {
                    "name": "Le havre",
                    "lng": "0.121646",
                    "lat": "49.527592",
                    "hints": [
                        {
                            "id": 6,
                            "value": "Située sur la rive droite de l'estuaire de la Seine",
                            "type": "text",
                            "id_destination": 2
                        },
                        {
                            "id": 7,
                            "value": "Son port est le deuxième de France pour le trafic total, et le premier port français pour les conteneurs.",
                            "type": "text",
                            "id_destination": 2
                        },
                        {
                            "id": 8,
                            "value": "Musée d'art moderne André-Malraux",
                            "type": "text",
                            "id_destination": 2
                        },
                        {
                            "id": 9,
                            "value": "Saint Thomas Basket",
                            "type": "text",
                            "id_destination": 2
                        },
                        {
                            "id": 10,
                            "value": "api/img/blason_le_havre.png",
                            "type": "url",
                            "id_destination": 2
                        }
                    ]
                },
                "places": [
                    {
                        "name": "Metz",
                        "lng": "6.1757155999999895",
                        "lat": "49.1193089",
                        "indication": "Ancienne capitale de la Lorraine",
                        "type_indication": null
                    },
                    {
                        "name": "Château de Versailles",
                        "lng": "2.120355",
                        "lat": "48.804865",
                        "indication": "Elle fut la résidence de Louis XIV",
                        "type_indication": null
                    },
                    {
                        "name": "Dijon",
                        "lng": "5.041479999999979",
                        "lat": "47.322047",
                        "indication": "La moutarde",
                        "type_indication": null
                    },
                    {
                        "name": "Dijon",
                        "lng": "5.069667",
                        "lat": "47.311461",
                        "indication": "Université de Bourgogne",
                        "type_indication": null
                    },
                    {
                        "name": "Calais",
                        "lng": "1.865608",
                        "lat": "50.966423",
                        "indication": "Port de Calais",
                        "type_indication": null
                    }
                ]
            });

            DataService.listPlaces($scope.game.places);
            DataService.listDestination($scope.game.destination);*/

        }




    };

    $scope.$on('leafletDirectiveMap.click', function (event, args) {
        $scope.clicked_lat = args.leafletEvent.latlng.lat;
        $scope.clicked_lng = args.leafletEvent.latlng.lng;

        console.log(distance($scope.clicked_lat, 49.28214015975995, $scope.clicked_lng, 3.438720703125))
    });

    $scope.init();
}]);
