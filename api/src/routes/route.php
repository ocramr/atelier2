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
use Slim\Middleware\JwtAuthentication;
\Firebase\JWT\JWT::$leeway = 5;
$app->add(new JwtAuthentication([
    "secret"=>"papo",
    "path"=>['/places','/destinations'],
    "secure" => false,
    "passthrough" => ['/user/login'],
    "error" => function ($request, $response, $arguments) {
        $data["status"] = "error";
        $data["message"] = $arguments["message"];
        return $response
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
]));

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
})->add('CORS');

$app->group('/user', function (){

    $this->post('/register', UserController::class. ':register')->setName('register');

    $this->post('/login', UserController::class. ':login')->setName('login');

})->add('CORS');

$app->group('/places', function (){

    $this->get('', ManagementController::class. ':getListePlaces')->setName('listPlaces');

    $this->patch('/{id}', ManagementController::class. ':editPlace');

    $this->post('[/]', ManagementController::class. ':addPlace');
    
})->add('CORS');


$app->group('/destinations', function (){

    $this->get('', ManagementController::class. ':getDestinations')->setName('destinations');
    $this->get('/{id}/hints', ManagementController::class. ':getHints')->setName('hints');
    $this->post('/{id_Dest}/hints', ManagementController::class. ':addHint');
    $this->put('/{id_Dest}/hints/{id}', ManagementController::class. ':editHint');
    $this->post('', ManagementController::class. ':createDestination')->setName('createDestination');
    $this->put('/{id}', ManagementController::class. ':updateDestination')->setName('updateDestination');

})->add('CORS');

$app->group('/levels', function (){

    $this->put('/{id}', ManagementController::class. ':updateLevel')->setName('updateLevel');

    $this->get('', UserController::class. ':getLevels')->setName('levels');

})->add('CORS');

$app->group('/game', function () {

    $this->put('/{id}/save', GameController::class. ':save')->setName('saveGame');

    $this->get('/ranking', GameController::class. ':ranking')->setName('ranking');

})->add('CORS');

$app->post('/game/play', GameController::class. ':playGame')->setName('playgame')->add('CORS');

$app->group('/hints', function(){
    $this->put('/{id}', ManagementController::class. ':editHint');
});



