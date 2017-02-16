angular.module('app').controller('DestinationController', ['$scope', '$http',
    'DataService', 'API_URL', function($scope, $http, DataService, API_URL) {

    $scope.API_URL = API_URL;

    $scope.$watch(function () {
        return DataService.destination;
    }, function (newVal) {
        if(newVal){
            $scope.destination = newVal;
        }
    });

}]);