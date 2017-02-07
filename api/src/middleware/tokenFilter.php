<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use app\model\Game;
use \Illuminate\Database\Eloquent\ModelNotFoundException as NotFound;

function checkTOKEN(Request $req, Response $resp, callable $next){

        $id = $req->getAttribute('route')->getArgument('id');
        $Authorization = $req->getHeader('Authorization');

        if(empty($Authorization)){
            $resp = $resp->withStatus(403);
            $resp->getBody()->write(json_encode(['Error'=>'No token']));
            $resp = $resp->withHeader("Content-type", "application/json, charset=utf-8");
            return $resp;
        }

        $token = substr($Authorization[0],6);

        try
        {
            Game::where('id','=',$id)->where('token','=',$token)->firstOrfail()->toJson();
        }
        catch(NotFound $e)
        {
            $resp = $resp->withStatus(403);
            $resp->getBody()->write(json_encode(['Error'=>'Invalid token']));
            $resp = $resp->withHeader("Content-type", "application/json, charset=utf-8");
            return $resp;
        }

        $resp = $next($req, $resp);
        return $resp;
}