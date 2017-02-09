app.controller('LevelController', ['$scope', '$http', 'API_URL',
    function($scope, $http, API_URL) {

        $scope.apiUrl = API_URL;

        console.log('level');
    }]);