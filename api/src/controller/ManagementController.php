<?php

namespace app\controller;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use \app\model\Place;

use Interop\Container\ContainerInterface;
use app\model\Destination;

class ManagementController extends AbstractController
{
        public function getDestinations($req,$res,$args)
            {
                $destinations = Destination::all();
                return $this->json_success($res, 200, $destinations);
            }
        public function getListePlaces($req, $resp, $args){
                return $this->json_success($resp, 200, Place::all());
        }

        public function editPlace($req, $resp, $args){
            try{
                $data = $req->getParsedBody();
                if(!isset($data['indication'])) return $this->json_error($resp, 400, "Missing Param");
                $place = Place::findOrfail($args['id']);
                $place->indication = filter_var($data['indication'], FILTER_SANITIZE_STRING);
                $place->save();
                return $this->json_success($resp, 200, $place);
            }
            catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
                return $this->json_error($resp, 404, "Not Found");
            }
        }

        public function createDestination($req, $res, $args)
        {
            $destination = new Destination();
            $arguments = $req->getParsedBody();
            if (!isset($arguments["name"]) || !isset($arguments["lng"]) || !isset($arguments["lat"]))
                return $this->json_error($res, 400, "Missing Parameters");

            $destination->name = filter_var($arguments["name"], FILTER_SANITIZE_STRING);
            $destination->lng = filter_var($arguments["lng"], FILTER_SANITIZE_STRING);
            $destination->lat = filter_var($arguments["lat"], FILTER_SANITIZE_STRING);
            if ($destination->save())
                return $this->json_success($res, 200, "Ajoutée avec succes");
            else
                return $this->json_error($res, 500, "Erreur d'ajout");
        }

         public function updateDestination($req, $res, $args)
        {
            $arguments = $req->getParsedBody();
            if (!isset($arguments["name"]) || !isset($arguments["lng"]) || !isset($arguments["lat"]))
                return $this->json_error($res, 400, "Missing Parameters");

            $destination = Destination::where("id", "=", $args["id"])->firstOrFail();
            $destination->name = filter_var($arguments["name"], FILTER_SANITIZE_STRING);
            $destination->lng = filter_var($arguments["lng"], FILTER_SANITIZE_STRING);
            $destination->lat = filter_var($arguments["lat"], FILTER_SANITIZE_STRING);
            if ($destination->save())
                return $this->json_success($res, 200, $destination);
            else
                return $this->json_error($res, 500, "Erreur de modification");
        }

}