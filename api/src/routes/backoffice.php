<?php
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 5/02/17
 * Time: 19:11
 */
use app\controller\GameController;
use app\controller\ManagementController;

$app->group('/game', function () use ($app){

    $app->post('', GameController::class. ':createGame')->setName('orders');

});


$app->group('/places', function () use ($app){
    $app->get('[/]', ManagementController::class. ':getListePlaces')->setName('listPlaces');
    $app->put('/{id}', ManagementController::class. ':editPlace');
});