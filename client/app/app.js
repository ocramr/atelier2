var app = angular.module("app", ['leaflet-directive','timer', 'ngAnimate']).constant('API_URL', '/atelier2/api/rest/');
app.config(function($logProvider){
  $logProvider.debugEnabled(false);
});
    