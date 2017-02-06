<?php

namespace app\controller;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use \app\model\Place;

use Interop\Container\ContainerInterface;
use app\model\Destination;

class ManagementController extends AbstractController
{
        public function getdestinations($req,$res,$args)
            {
                $destinations = Destination::all();
                $res->getBody()->write($destinations->toJson());
            }
        public function deletedestination($req,$res,$args)
            {
                $destination = Destination::where('id', '=', $args['id'])->firstOrFail();
                
                if($destination->delete())
                {
                    $this->json_success($res, 200, 'La destination a été supprimé avec succès');
                }
            }
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

        public function createDestination($req, $res, $args)
        {
            $destination = new Destination();
            $arguments = $req->getParsedBody();
            $destination->name = filter_var($arguments["name"]);
            $destination->lng = filter_var($arguments["lng"]);
            $destination->lat = filter_var($arguments["lat"]);
            if ($destination->save())
                return $this->json_success($res, 200, "Ajouter avec succes");
            else
                return $this->json_error($res, 500, "Erreur d'ajout");

            //var_dump($destination->toJson());
        }

}