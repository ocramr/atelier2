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
            //$scope.place = angular.copy(place);
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
                 console.log("exit");
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
                console.log(response.data);
            }, function (error) {
                console.log(error);
            });
        };
       
     
         $scope.addPlace = function()
        {
            var indication;
            var type;
            if($scope.place.indication.base64 !== undefined){
                indication = 'data:'+$scope.place.indication.filetype+';base64,'+$scope.place.indication.base64;
                type = 'url';
            }else{
                indication = $scope.place.indication;
                type = 'text';
            }
            //var indication = ($scope.place.indication.base64 !== undefined ) ? 'data:'+$scope.place.indication.filetype+';base64,'+$scope.place.indication.base64 : $scope.place.indication;
            var newPlace = {
                name : $scope.place.name,
                lng : $scope.place.lng,
                lat : $scope.place.lat,
                indication : indication,
                type_indication: type
            };
            PlaceFactory.add(newPlace).then(function (response) {
                angular.element('#addPlaceModal').modal('hide');
            }, function (error) {
                console.log(error);
            });
        };


        $scope.listAll();
    }]);