angular.module('app').controller('PlacesController', ['$scope', '$http', 'DataService',
    function($scope, $http, DataService) {

        $scope.$watch(function () {
            return DataService.places;
        }, function (newVal) {
            if(newVal){
                $scope.places = newVal;
            }
        });

    }]);