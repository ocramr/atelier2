app.controller('PlaceController', ['$scope', '$http', 'PlaceFactory', 'API_URL','$uibModal','DataService',
    function($scope, $http, PlaceFactory, API_URL, $uibModal,DataService) {

        $scope.API_URL = API_URL;
        $scope.places = [];

        var getModal = function () {
            return {
                templateUrl: 'placeModal.html',
                controller: 'ModalController',
                size: 'md'
            }
        };

        var addOrUpdate = function(place)
        {
            if(place.indication.base64 !== undefined){
                place.indication = 'data:'+place.indication.filetype+';base64,'+place.indication.base64;
            }
            if(place.id){
                PlaceFactory.update(place.id, place).then(function (response) {
                    $scope.listAll();
                }, function (error) {
                    console.log(error);
                });
            }else{
                PlaceFactory.add(place).then(function (response) {
                    $scope.listAll();
                }, function (error) {
                    console.log(error);
                });
            }
        };

        $scope.openModal = function (place) {
            var template = getModal();
            template.resolve = {
                'items' : function () {
                    return {
                        item : place,
                        saveFunction : addOrUpdate,
                        service : DataService
                    }
                }
            };
            $uibModal.open(template);
        };

        $scope.listAll = function () {
          PlaceFactory.all().then(function (response) {
              $scope.places = response.data;
          },function (error) {
              console.log(error);
          })
        };

        $scope.listAll();
    }]);