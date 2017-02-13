app.controller('DestinationController', ['$scope','$sce', '$http', 'DestinationFactory','API_URL', '$uibModal','DataService',
    function($scope, $sce, $http, DestinationFactory, API_URL, $uibModal,DataService) {
        $scope.API_URL = API_URL;
        $scope.destinations = [];
        $scope.selectedDestination={};
        $scope.hints = [];

        var listAll = function () {
            DestinationFactory.all().then(function (response) {
                $scope.destinations = response.data;
            }, function (error) {
                console.log(error);
            });
        };

        var getModal = function () {
            return {
                templateUrl: 'destinationModal.html',
                controller: 'ModalController',
                size: 'md'
            }
        };

        var addOrUpdate = function(destination)
        {
            if(destination.id){
                DestinationFactory.update(destination.id, destination).then(function (response) {
                    listAll();
                }, function (error) {
                    console.log(error);
                });
            }else{
                DestinationFactory.add(destination).then(function (response) {
                    listAll();
                }, function (error) {
                    console.log(error);
                });
            }
        };

        $scope.openModal = function (destination) {
            var template = getModal();
            template.resolve = {
                'items' : function () {
                    return {
                        item : destination,
                        saveFunction : addOrUpdate,
                        service : DataService
                    }
                }
            };
            $uibModal.open(template);
        };

        var deleteHint = function (hint) {
            console.log(hint);
            DestinationFactory.deleteHint(hint.id_destination, hint.id).then(function(response){
                console.log(response)
            },function(error){
                console.log(error)
            })
        };

        var getHintModal = function (isAddModal) {
            var templateUrl = isAddModal  ? 'addHint.html' : 'hintModal.html';
            return {
                templateUrl: templateUrl,
                controller: 'HintModalController',
                size: 'md'
            }
        };

        var saveHint = function (hint) {
            if(hint) {
                if (hint.value.base64 !== undefined) {
                    hint.value = 'data:' + hint.value.filetype + ';base64,' + hint.value.base64;
                }
                console.log(hint);
                DestinationFactory.addHint(hint.id_destination, hint).then(function (response) {

                }, function (error) {
                    console.log(error);
                });
            }
        };

        $scope.showHints = function(id) {
            DestinationFactory.allHints(id).then(function (response) {
                var modal = getHintModal(false);
                modal.resolve = {
                    'items' : function () {
                        return {
                            item : response.data,
                            saveFunction : deleteHint
                        }
                    }
                };
                    $uibModal.open(modal);
            }, function (error) {
                console.log(error);
            });


        };

        $scope.openAddHint = function(id_destination){
            var modal = getHintModal(true);
            modal.resolve = {
                'items' : function () {
                    return {
                        item : {id_destination : id_destination},
                        saveFunction : saveHint
                    }
                }
            };
            $uibModal.open(modal);
        };

        listAll();
    }]);






















