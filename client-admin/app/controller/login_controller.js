app.controller('LoginController', ['$scope', '$http', '$location', 'API_URL',
    function($scope, $http, $location, API_URL) {

        $scope.apiUrl = API_URL;

        $scope.user = {};

        $scope.login = function () {
          $location.path('/home');
        };
    }]);