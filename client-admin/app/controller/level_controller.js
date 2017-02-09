app.controller('LevelController', ['$scope', 'LevelFactory',
    function($scope, LevelFactory) {
        $scope.levels = [];

        $scope.listAll = function () {
            LevelFactory.all().then(function (response) {
                $scope.levels = response.data;
            },function (error) {
                console.log(error);
            })
        };

        $scope.edit = function (level) {
            console.log(level);
        };

        $scope.listAll();
    }]);