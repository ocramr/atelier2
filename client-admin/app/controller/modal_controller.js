app.controller('ModalController', ['$scope', '$http',  'API_URL', 'place','saveFunction','close',
    function($scope, $http, API_URL, place, saveFunction, close) {

    $scope.place = angular.copy(place);
    console.log($scope.place);
    $scope.addPlace = function () {
        console.log($scope.place);
        console.log(place);
       saveFunction($scope.place);
       close();
    }
}
    ]);