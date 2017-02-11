angular.module('app').controller('PlacesController', ['$scope', '$http', 'DataService','API_URL',
    function($scope, $http, DataService, API_URL) {

        $scope.API_URL = API_URL;

        $scope.$watch(function () {
            return DataService.places;
        }, function (newVal) {
            if(newVal){
                $scope.places = newVal;
            }
        });

    }]);