app.controller('ModalController', ['$scope', '$http',  'API_URL', 'place','saveFunction',
    function($scope, $http, API_URL, place, saveFunction) {

    $scope.place = angular.copy(place);
    $scope.addPlace = function () {
        console.log($scope.place);
        console.log(place);
       saveFunction($scope.place);
    }
}
    ]);