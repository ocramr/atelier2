app.controller('LevelController', ['$scope', 'LevelFactory',
    function($scope, LevelFactory) {
        $scope.levels = [];
        $scope.selected={};
        $scope.getTemplate = function (level) {
            if (level.id === $scope.selected.id){
                return 'edit';
            }
            else return 'display';
        };

        $scope.edit = function (level) {
            $scope.selected = angular.copy(level);
        };

        $scope.reset = function () {
            $scope.selected = {};
        };

        $scope.update = function (level) {
            LevelFactory.update(level.id, level).then(function (response) {
                console.log(response.data);
                $scope.reset();
            }, function (error) {
                console.log(error);
            });
        };

        $scope.listAll = function () {
            LevelFactory.all().then(function (response) {
                $scope.levels = response.data;
            },function (error) {
                console.log(error);
            })
        };

        $scope.listAll();
    }]);