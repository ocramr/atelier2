app.controller('PlaceController', ['$scope', '$http', 'PlaceFactory', 'API_URL','ModalService',
    function($scope, $http, PlaceFactory, API_URL, ModalService) {

        $scope.API_URL = API_URL;
        $scope.place={};
        $scope.indicTypes = [
            {"id": 0,"value": "text"}, {"id": 1, "value": "url"}
        ];
        $scope.places = [];

        $scope.getTemplate = function (place) {
            if (place.id === $scope.selected.id){
                return 'edit';
            }
            else return 'display';
        };

        $scope.edit = function (place) {
             ModalService.showModal({
             templateUrl: "addPlace.html",
             size: 'md',
             controller: 'ModalController',
                 inputs:{
                    place : place,
                     saveFunction: $scope.update
                 }
             }).then(function(modal) {
                 modal.element.modal();
                 modal.close.then(function(result) {

                });
             });

        };

        $scope.listAll = function () {
          PlaceFactory.all().then(function (response) {
              $scope.places = response.data;
          },function (error) {
              console.log(error);
          })
        };

        $scope.update = function (place) {
            var indication;
            var type;
            if(place.indication.base64 !== undefined){
                indication = 'data:'+place.indication.filetype+';base64,'+place.indication.base64;
                type = 'url';
            }else{
                indication = place.indication;
                type = 'text';
            }
            place.indication = indication;
            place.type_indication = type;
            console.log(place);
            PlaceFactory.update(place.id, place).then(function (response) {
                $scope.places.push(response.data);
                console.log($scope.places);
                $scope.listAll();
            }, function (error) {
                console.log(error);
            });
        };

        $scope.openAddModal = function () {
                ModalService.showModal({
                    templateUrl: "addPlace.html",
                    size: 'md',
                    controller: 'ModalController',
                    inputs:{
                        place : {},
                        saveFunction: $scope.addPlace
                    }
                }).then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function(result) {

                    });
                });
        };
       
     
         $scope.addPlace = function(place)
        {
            if(place.indication.base64 !== undefined){
                place.indication = 'data:'+place.indication.filetype+';base64,'+place.indication.base64;
                place.type = 'url';
            }else{
                place.type = 'text';
            }

            PlaceFactory.add(place).then(function (response) {
                angular.element('#addPlaceModal').modal('hide');
            }, function (error) {
                console.log(error);
            });
        };


        $scope.listAll();
    }]);