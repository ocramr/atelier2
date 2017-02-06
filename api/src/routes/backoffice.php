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

$app->group('/backoffice', function () use ($app){

    $app->post('/register', UserController::class. ':register')->setName('register');

    $app->get('/login', UserController::class. ':login')->setName('login');

});


$app->group('/places', function () use ($app){

    $app->get('[/]', ManagementController::class. ':getListePlaces')->setName('listPlaces');

    $app->put('/{id}', ManagementController::class. ':editPlace');
        
});


$app->group('/destinations', function () use ($app){

    $app->get('', ManagementController::class. ':getdestinations')->setName('destinations');
    $app->delete('/{id}', ManagementController::class. ':deletedestination')->setName('destintion');

});
