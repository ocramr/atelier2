app.controller('RegisterController', ['$scope', '$http', '$location', 'UserFactory',
    function($scope, $http, UserFactory) {

        $scope.user = {};

        $scope.register = function(){
            console.log($scope.user);
            UserFactory.register($scope.user).then(function(response){
                $location('/login')
                //console.log(response.data)
            },function(error){
                console.log(error)
            })
        }
    }]);
