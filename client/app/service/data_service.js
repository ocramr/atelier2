angular.module('app').service('DataService', function () {

    this.listPlaces = function (places) {
        this.places = places;
    };
    this.listDestination = function (destination) {
        this.destination = destination;
    };

    this.reset = function () {
        this.places = undefined;
        this.destination = undefined;
    }

});