app.controller('DestinationController', ['$scope', '$http',  'DestinationFactory',
    function($scope, $http, DestinationFactory) {

        $scope.destinations = [];

        $scope.listAll = function () {
            DestinationFactory.all().then(function (response) {
                $scope.destinations = response.data;
                console.log($scope.destinations);
            }, function (error) {
                console.log(error);
            });
        };

        $scope.edit = function (destination) {
          console.log(destination);
        };


        $scope.listAll();
    }]);