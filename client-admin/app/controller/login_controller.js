app.controller('LoginController', ['$scope', '$http', '$location', 'UserFactory',
    function($scope, $http, $location, UserFactory) {

      $scope.user = {};

        $scope.login = function () {

            console.log($scope.user);
            UserFactory.login($scope.user, function (isSuccess) {
                if(isSuccess){
                    $location.url('/home');
                }else{
                    console.log("error");
                }
            });

        };
    }]);