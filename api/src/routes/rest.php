<?php

use app\controller\UserController;
use app\controller\GameController;

$app->group('/game', function () use ($app){
    $app->post('/play', GameController::class. ':playGame')->setName('playgame');

});
