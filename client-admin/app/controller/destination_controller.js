app.controller('DestinationController', ['$scope', '$http', 'DestinationFactory','API_URL', 'ModalService',
    function($scope, $http, DestinationFactory, API_URL, ModalService) {
        $scope.API_URL = API_URL;
        $scope.destinations = [];
        //$scope.destination = {};
        $scope.selectedDestination={};
        $scope.hints = [];
        $scope.selectedHint={};

        $scope.showHints = function(id) {
            console.log($scope.selectedDestination);
            console.log($scope.destinations);
            DestinationFactory.allHints(id).then(function (response) {
                $scope.hints = response.data;
                ModalService.showModal({
                    templateUrl: "hintModal.html",
                    size: 'md',
                    controller: 'HintController',
                    inputs:{
                        hints: response.data
                    }
                }).then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function(result) {
                        console.log("exit");
                    });
                });
            }, function (error) {
                console.log(error);
            });
        };

        $scope.addHint = function(){     
            var destination_id = angular.element("#idDestination")[0].value;    
            var value = ($scope.hint.value.base64 !== undefined ) ? 'data:'+$scope.hint.value.filetype+';base64,'+$scope.hint.value.base64 : $scope.hint.value;
            var newHint = {
                value : value
            }
            DestinationFactory.addHint(destination_id, newHint).then(function (response) {
                angular.element('#newHint').modal('hide');
                $scope.reset();
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
            console.log($scope.selectedDestination);
            console.log($scope.destinations);
            $scope.selectedDestination = angular.copy(destination);
        };

        $scope.reset = function () {
            $scope.selectedDestination = {};
        };

        $scope.listAll = function () {
            DestinationFactory.all().then(function (response) {
                console.log($scope.destinations)
                $scope.destinations = response.data;
                console.log($scope.destinations);
            }, function (error) {
                console.log(error);
            });
        };

        $scope.update = function (destination) {
            console.log(destination)
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