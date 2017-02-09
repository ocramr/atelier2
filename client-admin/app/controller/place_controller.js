app.controller('PlaceController', ['$scope', '$http', 'PlaceFactory',
    function($scope, $http, PlaceFactory) {

        $scope.places = [];

        $scope.listAll = function () {
          PlaceFactory.all().then(function (response) {
              $scope.places = response.data;
          },function (error) {
              console.log(error);
          })
        };

        $scope.edit = function (place) {
            console.log(place);
        };


        $scope.listAll();
    }]);