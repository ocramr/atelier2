angular.module('backoffice').controller('RegisterController', ['$scope', '$http', 'API_URL',
    function($scope, $http, API_URL) {

        $scope.apiUrl = API_URL;

        console.log('Register');
    }]);