app.controller('ModalController', ['$scope', '$http',  'API_URL', 'place','saveFunction',
    function($scope, $http, API_URL, place, saveFunction) {

    $scope.place = place;
    $scope.addPlace = function () {
       saveFunction($scope.place);
    }
}
    ]);