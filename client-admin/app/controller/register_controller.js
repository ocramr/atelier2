app.controller('RegisterController', ['$scope', '$http', 'UserFactory',
    function($scope, $http, UserFactory) {

        $scope.user = {};

        $scope.register = function(){
            console.log($scope.user);
            UserFactory.register($scope.user).then(function(response){
                console.log(response.data)
            },function(error){
                console.log(error)
            })
        }

        console.log('Register');
    }]);
