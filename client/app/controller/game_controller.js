angular.module('app').controller('GameController', ['$scope', '$http', 'Game','GameFactory', 'LevelFactory','DataService',
    function($scope, $http, Game, GameFactory, LevelFactory, DataService){

    $scope.newGame ={};
    $scope.levels = [];
    $scope.position = 5;
    $scope.markers = new Array();
    $scope.paths = new Array();
    
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

    $scope.finishGame = function (score,duration) {
        GameFactory.finish($scope.game.id, {"score": score, "duration": duration})
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
        };

        if(!$scope.levels || $scope.levels.length == 0) {
            LevelFactory.all().then(function (response) {
                $scope.levels = response.data;
            }, function (error) {
                console.log(error);
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
                    }else
                    {
                        console.log('Réessayez')
                    } 
                }
               if($scope.position == 5)
                {
                    lat2 = $scope.game.destination.lat;
                    lng2 = $scope.game.destination.lng;

                    //Calculer la distance entre les deux lieux
                    d = distance(clicked_lat,parseFloat(lat2),clicked_lng,parseFloat(lng2))
                    if(d < $scope.game.level.distance)
                    {
                        score = 10;
                        angular.extend($scope, {
                            markers: {
                                point_destination : {
                                    lat : parseFloat(lat2),
                                    lng : parseFloat(lng2),
                                    icon : {
                                        iconUrl: 'https://cdn2.iconfinder.com/data/icons/flat-seo-web-ikooni/128/flat_seo2-19-512.png',
                                        iconSize:     [80, 80],
                                        }
                                    
                                }
                            }
                        });
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
                    $scope.finishGame(score,200);
                }        
            }
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
            DataService.listDestination($scope.game.destination);

        })  */
    };
    $scope.init();  

}]);
