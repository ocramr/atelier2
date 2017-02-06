<?php
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 5/02/17
 * Time: 19:11
 */
use app\controller\GameController;

$app->group('/game', function () use ($app){

    $app->post('', GameController::class. ':createGame')->setName('orders');

});
/*
* Author : ikram
*/

$app->group('/destinations', function () use ($app){

    $app->get('', GameController::class. ':getdestinations')->setName('orders');

});
