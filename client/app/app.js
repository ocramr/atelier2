var app = angular.module("app", ['leaflet-directive','timer', 'ngAnimate']).constant('API_URL', 'http://backend.findyourway.local/');
app.config(function($logProvider){
  $logProvider.debugEnabled(false);
});
    