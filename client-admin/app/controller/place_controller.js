app.controller('PlaceController', ['$scope', '$http', 'PlaceFactory', 'API_URL',
    function($scope, $http, PlaceFactory, API_URL) {

        $scope.API_URL = API_URL;
        $scope.selected={};
        $scope.indicTypes = [
            {"id": 0,"value": "text"}, {"id": 1, "value": "url"}
        ];
        $scope.places = [];

        $scope.getTemplate = function (place) {
            if (place.id === $scope.selected.id){
                return 'edit';
            }
            else return 'display';
        };

        $scope.edit = function (destination) {
            $scope.selected = angular.copy(destination);
        };

        $scope.reset = function () {
            $scope.selected = {};
        };


        $scope.listAll = function () {
          PlaceFactory.all().then(function (response) {
              $scope.places = response.data;
          },function (error) {
              console.log(error);
          })
        };

        $scope.update = function (destination) {
            DestinationFactory.update(destination.id, destination).then(function (response) {
                console.log(response.data);
                $scope.reset();
            }, function (error) {
                console.log(error);
            });
        };
       
     
         $scope.addPlace = function()
        {
            console.log($scope.place)
            var indication = ($scope.place.indication.base64 !== undefined ) ? $scope.place.filetype+';base64,'+$scope.place.indication.base64 : $scope.place.indication;
            var newPlace = {
                name : $scope.place.name,
                lng : $scope.place.lng,
                lat : $scope.place.lat,
                indication : indication
            }
            console.log(newPlace);
            PlaceFactory.add(newPlace).then(function (response) {
                angular.element('#addPlaceModal').modal('hide');
                $scope.reset();
            }, function (error) {
                console.log(error);
            });
        }


        $scope.listAll();
    }]);