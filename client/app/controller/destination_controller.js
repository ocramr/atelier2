angular.module('app').controller('DestinationController', ['$scope', '$http','DataService',
    function($scope, $http, DataService) {

    $scope.$watch(function () {
        return DataService.destination;
    }, function (newVal) {
        if(newVal){
            $scope.destination = newVal;
        }
    });

}]);