
angular.module('app').directive('places', [
    function(){
        return{
            restrict : 'E',
            templateUrl : 'app/templates/places.html'
        };
    }
]);