app.controller('LoginController', ['$scope', '$http', 'API_URL',
    function($scope, $http, API_URL) {

        $scope.apiUrl = API_URL;

        $scope.user = {};

        $scope.login = function () {
          console.log($scope.user.username);
        };
    }]);