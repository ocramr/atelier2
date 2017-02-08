<?php
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 5/02/17
 * Time: 19:11
 */
use app\controller\GameController;
use app\controller\UserController;
use app\controller\ManagementController;

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
})->add('CORS');

$app->group('/user', function (){

    $this->post('/register', UserController::class. ':register')->setName('register');

    $this->get('/login', UserController::class. ':login')->setName('login');

});


$app->group('/places', function (){

    $this->get('[/]', ManagementController::class. ':getListePlaces')->setName('listPlaces');

    $this->put('/{id}', ManagementController::class. ':editPlace');

    $this->post('[/]', ManagementController::class. ':addPlace');
    
});


$app->group('/destinations', function (){

    $this->get('', ManagementController::class. ':getDestinations')->setName('destinations');
    $this->post('', ManagementController::class. ':createDestination')->setName('createDestination');
    $this->put('/{id}', ManagementController::class. ':updateDestination')->setName('updateDestination');

});

$app->group('/levels', function (){

    $this->post('', ManagementController::class. ':createLevel')->setName('createLevel')->add('checkTOKEN');

    $this->get('', UserController::class. ':getLevels')->setName('levels')->add('CORS');

});

$app->group('/game', function () {

    $this->put('/{id}/save', GameController::class. ':save')->setName('saveGame');

    $this->get('/ranking', GameController::class. ':ranking')->setName('ranking');

})->add('checkTOKEN')->add('CORS');

$app->post('/game/play', GameController::class. ':playGame')->setName('playgame')->add('CORS');



