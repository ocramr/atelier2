app.controller('HomeController', ['$scope', '$http', '$location', 'UserFactory','$localStorage',
    function($scope, $http, $location, UserFactory, $localStorage) {

        $scope.logout = function () {
            UserFactory.logout(function () {
                $location.url('/login');
            });

        };
        if($localStorage.currentUser)
        {
            $scope.currentUser = $localStorage.currentUser; 
        }
    }]);
