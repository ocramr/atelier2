angular.module('app').service('Game', [function(){

        function Game(data){
            this.id = data.id_game;
            this.pseudo = data.pseudo;
            this.token = data.token;
            this.score = data.score || '';
            this.state = data.state || '';
            this.duration = data.duration || '';
            this.level = data.level;
            this.places = data.places;
            this.destination = data.destination;
            this.isPlaying = true;
            this.currentPosition = data.currentPosition || 0 ;
        }

        return Game;
    }
]);