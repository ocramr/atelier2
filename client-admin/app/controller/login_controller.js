app.controller('LoginController', ['$scope', '$http', '$location', 'UserFactory',
    function($scope, $http, $location, UserFactory) {

      $scope.user = {};

        $scope.login = function () {
            UserFactory.login($scope.user, function (isSuccess) {
                if(isSuccess){
                    $location.url('/home/destination');
                }else{
                    console.log("error");
                }
            });

        };
    }]);