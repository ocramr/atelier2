<?php

namespace app\controller;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use \app\model\Place;

use Interop\Container\ContainerInterface;

class ManagementController extends AbstractController
{
    public function getListePlaces($req, $resp, $atbs){
         return $this->json_success($resp, 200, Place::all());
    }

    public function editPlace($req, $resp, $atbs){
        try{
            $data = $req->getParsedBody();
            if(!isset($data['indication'])) return $this->json_error($resp, 400, "Missing Param");
            $place = Place::findOrfail($atbs['id']);
            $place->indication = filter_var($data['indication'], FILTER_SANITIZE_STRING);
            $place->save();
            return $this->json_success($resp, 200, $place);
        }
        catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
            return $this->json_error($resp, 404, "Not Found");
        }
    }
}