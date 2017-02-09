app.controller('LoginController', ['$scope', '$http', '$location', 'UserFactory',
    function($scope, $http, $location, UserFactory) {

      $scope.user = {};

        $scope.login = function () {
            console.log($scope.user);
            UserFactory.login($scope.user).then(function (response) {
                console.log(response.data);
                //$location.path('/home');
            }, function (error) {
                console.log(error);
            });
        };
    }]);