<?php
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 5/02/17
 * Time: 19:11
 */
use app\controller\GameController;
use app\controller\UserController;

$app->group('/backoffice', function () use ($app){

    $app->post('/register', UserController::class. ':register')->setName('register');

    $app->get('/login', UserController::class. ':login')->setName('login');

});