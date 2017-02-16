app.controller('HintModalController', ['$scope', '$http',  'API_URL', '$uibModalInstance','items',
    function($scope, $http, API_URL,$uibModalInstance,  items) {

    $scope.API_URL = items.API_URL;

    $scope.item = angular.copy(items.item);
        $scope.cancel = function () {
            $uibModalInstance.close('cancel');
        };

        $scope.process = function (i) {
            console.log(i);
            items.saveFunction(i);
            $uibModalInstance.close();
        };
}
    ]);