app.controller('HintController', ['$scope', '$http', 'DestinationFactory', 'close','hints','API_URL',
    function($scope, $http, DestinationFactory, close, hints, API_URL) {
        $scope.API_URL = API_URL;

        $scope.hints = hints;

        $scope.selected = {};

        $scope.isEditing = function (hint) {
            return $scope.selected.id == hint.id;
        };



        $scope.reset = function () {
            $scope.selected = {};
        };
        
        
        $scope.close = function(result) {
            close(result, 500); // close, but give 500ms for bootstrap to animate
        };

    }]);
