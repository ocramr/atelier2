app.controller('DestinationController', ['$scope', '$http', 'DestinationFactory','API_URL', 'ModalService',
    function($scope, $http, DestinationFactory, API_URL, ModalService) {
        $scope.API_URL = API_URL;
        $scope.destinations = [];
        $scope.destination = {};
        $scope.selectedDestination={};
        $scope.hints = [];
        $scope.selectedHint={};

        $scope.showHints = function(id) {
            DestinationFactory.allHints(id).then(function (response) {
                ModalService.showModal({
                    templateUrl: "hintModal.html",
                    controller: "HintController",
                    inputs:{
                        hints: response.data
                    }
                }).then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function(result) {
                        $scope.yesNoResult = result ? "You said Yes" : "You said No";
                        console.log($scope.yesNoResult);
                    });
                });
            }, function (error) {
                console.log(error);
            });


        };

        $scope.getTemplate = function (destination) {
            if (destination.id === $scope.selectedDestination.id){
                return 'edit';
            }
            else return 'display';
        };

        $scope.edit = function (destination) {
            $scope.selectedDestination = angular.copy(destination);
        };

        $scope.reset = function () {
            $scope.selectedDestination = {};
            console.log($scope.destinations);
        };

        $scope.listAll = function () {
            DestinationFactory.all().then(function (response) {
                $scope.destinations = response.data;
                console.log($scope.destinations);
            }, function (error) {
                console.log(error);
            });
        };

        $scope.update = function (destination) {
            DestinationFactory.update(destination.id, destination).then(function (response) {
                console.log(response.data);
                $scope.reset();
            }, function (error) {
                console.log(error);
            });
        };


        $scope.addDestination = function()
        {
            console.log($scope.destination);
             DestinationFactory.add($scope.destination).then(function (response) {
                angular.element('#addDestinationModal').modal('hide');
                $scope.reset();
            }, function (error) {
                console.log(error);
            });
        };


        $scope.listAll();
    }]);