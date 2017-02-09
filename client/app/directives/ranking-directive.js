
angular.module('app').directive('ranking', [
    function(){
        return{
            restrict : 'E',
            templateUrl : 'app/templates/ranking.html'
        };
    }
]);