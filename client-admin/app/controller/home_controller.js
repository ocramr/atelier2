app.controller('HomeController', ['$scope', '$http', '$location', 'UserFactory',
    function($scope, $http, $location, UserFactory) {

        $scope.logout = function () {
            UserFactory.logout(function () {
                $location.url('/login');
            });

        };
    }]);
