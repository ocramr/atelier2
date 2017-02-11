app.controller('DestinationController', ['$scope','$sce', '$http', 'DestinationFactory','API_URL', 'ModalService',
    function($scope, $sce, $http, DestinationFactory, API_URL, ModalService) {
        $scope.API_URL = API_URL;
        $scope.destinations = [];
        $scope.selectedDestination={};
        $scope.hints = [];
        $scope.selectedHint={};
        $scope.help = "Need Locations?";

        $scope.showHints = function(id) {
            $scope.closeEdit();
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
            };
            DestinationFactory.addHint(destination_id, newHint).then(function (response) {
                angular.element('#newHint').modal('hide');
                $scope.reset();
            }, function (error) {
                console.log(error);
            });
        };

        $scope.isEditing = function (destination) {
          return $scope.selectedDestination.id == destination.id;
        };

        $scope.edit = function (destination) {
            $scope.selectedDestination.id = destination.id;
        };

        $scope.closeEdit = function () {
            $scope.selectedDestination = {};
        };

        $scope.listAll = function () {
            DestinationFactory.all().then(function (response) {
                $scope.destinations = response.data;
            }, function (error) {
                console.log(error);
            });
        };

        $scope.update = function (destination) {
            DestinationFactory.update(destination.id, destination).then(function (response) {
                $scope.closeEdit();
            }, function (error) {
                console.log(error);
            });
        };


        $scope.addDestination = function()
        {
             DestinationFactory.add($scope.destination).then(function (response) {
                angular.element('#addDestinationModal').modal('hide');
                $scope.reset();
            }, function (error) {
                console.log(error);
            });
        };

        $scope.getLocationOfDestination = function(){
            $scope.help = "Plase waite ...";
            //je n'ai trouvé aucun moyen pour faire appele a l'API google Geocoding avec angular
            //Je l'ai fait directement en AJAX sans passé par JQuery pour ne pas avoir des conflit
                //Mode synchrone
                var request = new XMLHttpRequest();
                request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address='+$scope.destination.name, false);  // `false` makes the request synchronous
                request.send(null);

                if (request.status === 200) {
                    var data = JSON.parse(request.responseText);
                    $scope.destination.lat = data.results[0].geometry.location.lat;
                    $scope.destination.lng = data.results[0].geometry.location.lng;
                    $scope.help = "Need Locations?";
                }
        }


        $scope.listAll();
    }]);






















