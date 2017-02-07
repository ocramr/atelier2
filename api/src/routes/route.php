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

$app->group('/user', function () use ($app){

    $app->post('/register', UserController::class. ':register')->setName('register');

    $app->get('/login', UserController::class. ':login')->setName('login');

});


$app->group('/places', function () use ($app){

    $app->get('[/]', ManagementController::class. ':getListePlaces')->setName('listPlaces');

    $app->put('/{id}', ManagementController::class. ':editPlace');

    $app->post('[/]', ManagementController::class. ':addPlace');
    
});


$app->group('/destinations', function () use ($app){

    $app->get('', ManagementController::class. ':getDestinations')->setName('destinations');
    $app->post('', ManagementController::class. ':createDestination')->setName('createDestination');
    $app->put('/{id}', ManagementController::class. ':updateDestination')->setName('updateDestination');

});

$app->group('/levels', function () use ($app){

    $app->post('', ManagementController::class. ':createLevel')->setName('createLevel')->add('checkTOKEN');

    $app->get('', UserController::class. ':getLevels')->setName('levels')->add('CORS');

});

$app->group('/game', function () use ($app){

    $app->put('/{id}/save', GameController::class. ':save')->setName('saveGame');

    $app->get('/ranking', GameController::class. ':ranking')->setName('ranking');
})->add('checkTOKEN');

$app->post('/game/play', GameController::class. ':playGame')->setName('playgame');



