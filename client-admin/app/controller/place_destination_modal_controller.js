app.controller('ModalController', ['$scope', '$http',  'API_URL', '$uibModalInstance','items',
    function($scope, $http, API_URL,$uibModalInstance,  items) {

    $scope.item = angular.copy(items.item);
    var myService = items.service;

        $scope.cancel = function () {
            $uibModalInstance.close('cancel');
        };

        $scope.process = function () {
            items.saveFunction($scope.item);
            $uibModalInstance.close();
        };

        $scope.getLocationOfDestination = function(){
            var data = myService.getLocationOfDestination($scope.item.name);
            if(data){
                $scope.item.lat = data.results[0].geometry.location.lat;
                $scope.item.lng = data.results[0].geometry.location.lng;
            }
        };
}
    ]);