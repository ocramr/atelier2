angular.module('backoffice').service('DataService', function () {

    this.listHints = function (hints) {
        this.hints = hints;
    };


    this.reset = function () {
        this.hints = [];
    }

});