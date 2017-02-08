angular.module('app').controller('DestinationController', ['$scope', '$http', 'API_URL', 'DataService',
    function($scope, $http, API_URL, DataService) {

    $scope.apiUrl = API_URL;

    $scope.$watch(function () {
        return DataService.destination;
    }, function (newVal) {
        if(newVal){
            $scope.destination = newVal;
        }
    });

}]);