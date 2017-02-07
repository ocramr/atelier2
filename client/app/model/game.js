
angular.module('app').service('Game', [
    function(){

        var Game = function(data){
            this.id = data.id_game;
            this.pseudo = data.pseudo;
            this.token = data.token;
            this.score = data.score || '';
            this.state = data.state || '';
            this.duration = data.duration || '';
            this.level = data.level;
            this.places = data.places;
            this.destination = data.destination;
        };

        return Game;
    }
]);