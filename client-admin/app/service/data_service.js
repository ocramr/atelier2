angular.module('backoffice').service('DataService', function () {

    this.getLocationOfDestination = function(name){
        //Mode synchrone
        var request = new XMLHttpRequest();
        request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address='+name+'&key=AIzaSyBiXeft81K4msC0Lsdk9taeW8fUwLZ-UdQ', false);  // `false` makes the request synchronous
        request.send(null);

        if (request.status === 200) {
            return JSON.parse(request.responseText);
        }else{
            return false;
        }
    };

});