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
            PlaceFactory.add($scope.place).then(function (response) {
                angular.element('#addPlaceModal').modal('hide');
                $scope.reset();
            }, function (error) {
                console.log(error);
            });
        }


        $scope.listAll();
    }]);