
angular.module('app').directive('destination', [
    function(){
        return{
            restrict : 'E',
            templateUrl : 'app/templates/destination.html'
        };
    }
]);