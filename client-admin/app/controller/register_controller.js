app.controller('RegisterController', ['$scope', '$http', 'UserFactory', '$location', 
    function($scope, $http, UserFactory, $location) {

        $scope.user = {};

        $scope.register = function(){
            UserFactory.register($scope.user).then(function(response){
                $location.url('/login')
            },function(error){
                console.log(error)
            })
        }
    }]);
