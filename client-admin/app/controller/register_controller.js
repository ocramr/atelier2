app.controller('RegisterController', ['$scope', '$http', 'API_URL', 'UserFactory',
    function($scope, $http, API_URL, UserFactory) {

        $scope.apiUrl = API_URL;

        UserFactory.register($scope.user).then(function(response){
            console.log(response.data)
        },function(error){
            console.log(error)
        })

        console.log('Register');
    }]);



last_name
first_name
email
username