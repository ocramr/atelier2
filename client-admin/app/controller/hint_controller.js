app.controller('HintController', ['$scope', '$http', 'close','hints','API_URL',
    function($scope, $http, close, hints, API_URL) {
        $scope.API_URL = API_URL;

        $scope.hints = hints;

        $scope.selected = {};

        $scope.getTemplate = function (hint) {
            if (hint.id === $scope.selected.id){
                return 'edit';
            }
            else return 'display';
        };

        $scope.edit = function (hint) {
            $scope.selected = angular.copy(hint);
        };

        $scope.reset = function () {
            $scope.selected = {};
        };
        
        
        $scope.close = function(result) {
            close(result, 500); // close, but give 500ms for bootstrap to animate
        };

    }]);
