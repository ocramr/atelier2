
angular.module('app').directive('game', [
    function(){
        return{
            restrict : 'E',
            templateUrl : 'app/templates/game.html'
        };
    }
]);