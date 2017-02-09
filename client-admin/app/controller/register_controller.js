app.controller('RegisterController', ['$scope', '$http', 'API_URL', 'UserFactory',
    function($scope, $http, API_URL, UserFactory) {

        $scope.apiUrl = API_URL;

        $scope.register = function(){
            UserFactory.register($scope.user).then(function(response){
                console.log(response.data)
            },function(error){
                console.log(error)
            })
        }

        console.log('Register');
    }]);
