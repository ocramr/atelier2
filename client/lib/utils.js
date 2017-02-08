    Number.prototype.toRad = function() {
	return this * Math.PI / 180;
    }

    function distance(lat1, lat2, lon1, lon2) {
        var R = 6371000; // meter
        var Phi1 = lat1.toRad();
        var Phi2 = lat2.toRad();
        var DeltaPhi = (lat2 - lat1).toRad();
        var DeltaLambda = (lon2 - lon1).toRad();

        var a = Math.sin(DeltaPhi / 2) * Math.sin(DeltaPhi / 2)
                + Math.cos(Phi1) * Math.cos(Phi2) * Math.sin(DeltaLambda / 2)
                * Math.sin(DeltaLambda / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        return d;
    }



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