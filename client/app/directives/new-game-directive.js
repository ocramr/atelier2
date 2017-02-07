
angular.module('app').directive('new-game', [
    function(){
        return{
            restrict : 'E',
            templateUrl : 'app/templates/new-game.html'
        };
    }
]);