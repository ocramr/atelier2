<?php

use app\controller\UserController;
use app\controller\GameController;

$app->group('/game', function () use ($app){

    $app->put('/{id}/save', GameController::class. ':save')->setName('saveGame');

    $app->get('/ranking', GameController::class. ':ranking')->setName('ranking');
})->add('checkTOKEN');

$app->post('/game/play', GameController::class. ':playGame')->setName('playgame');

