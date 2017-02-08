angular.module('app').controller('PlacesController', ['$scope', '$http', 'API_URL', 'DataService',
    function($scope, $http, API_URL, DataService) {

        $scope.apiUrl = API_URL;

        $scope.$watch(function () {
            return DataService.places;
        }, function (newVal) {
            if(newVal){
                $scope.places = newVal;
            }
        });

    }]);