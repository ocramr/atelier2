app.controller('DestinationController', ['$scope', '$http',  'DestinationFactory',
    function($scope, $http, DestinationFactory) {

        $scope.destinations = [];
        $scope.destination = {};
        $scope.selected={};
        $scope.getTemplate = function (destination) {
            if (destination.id === $scope.selected.id){
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
            DestinationFactory.all().then(function (response) {
                $scope.destinations = response.data;
                console.log($scope.destinations);
            }, function (error) {
                console.log(error);
            });
        };

        $scope.update = function (destination) {
            DestinationFactory.update(destination.id, destination).then(function (response) {
                console.log(response.data);
                $scope.reset();
            }, function (error) {
                console.log(error);
            });
        };

        $scope.openHints = function (id) {
            DestinationFactory.allHints(id).then(function (response) {
                console.log(response.data);
            }, function (error) {
               console.log(error);
            });
        };

        $scope.addDestination = function()
        {
            console.log($scope.destination)
             DestinationFactory.add($scope.destination).then(function (response) {
                angular.element('#addDestinationModal').modal('hide');
                $scope.reset();
            }, function (error) {
                console.log(error);
            });
        }

        $scope.listAll();
    }]);