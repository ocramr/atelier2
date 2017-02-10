<?php

namespace app\controller;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use \app\model\Place;

use Interop\Container\ContainerInterface;
use app\model\Destination;
use app\model\Level;

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
                $place = Place::firstOrfail($args['id']);
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
                return $this->json_success($res, 200, json_encode($destination));
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
                return $this->json_success($res, 200, json_encode($destination));
            else
                return $this->json_error($res, 500, "Erreur de modification");
        }

        public function addPlace($req, $resp, $args){
            //variable pour stocker l'url de l'image si le user utilise une image
            $newPlaceImg = "";
            $data = $req->getParsedBody();
            if(!isset($data['name'])) return $this->json_error($resp, 400, "Missing Param name");
            if(!isset($data['lng'])) return $this->json_error($resp, 400, "Missing Param lng");
            if(!isset($data['lat'])) return $this->json_error($resp, 400, "Missing Param lat");

            //Si le champ indication n'existe pas
            if(!isset($_FILES['indication']) && !isset($data['indication'])){
                return $this->json_error($resp, 400, "Missing Param indication");
            }

            //si le user upload une image
            if(isset($_FILES['indication'])){
                move_uploaded_file($_FILES['indication']['tmp_name'], '../img/'.$_FILES['indication']['name']);
                $newPlaceImg = 'img/'.$_FILES['indication']['name'];
            }

            $newPlace = new Place();
            $newPlace->name = $data['name'];
            $newPlace->lng = $data['lng'];
            $newPlace->lat = $data['lat'];
            //si l'image existe en l'enregistre sinon on prend la chaine de caractéres
            if($newPlaceImg === ""){
                $newPlace->indication = $data['indication'];
                $newPlace->type_indication = "text";
            }
            else{
                $newPlace->indication = $newPlaceImg;
                $newPlace->type_indication = "url";
            }
            if($newPlace->save()) return $this->json_success($resp, 201, $newPlace->toJson());
            return $this->json_error($resp, 500, "Erreur lors de l'ajout");
  
        }

        public function createLevel($req, $res, $args)
        {
            $arguments = $req->getParsedBody();
            if (!isset($arguments["max_attempts"]) || !isset($arguments["distance"]) || !isset($arguments["time"]))
                return $this->json_error($res, 400, "Missing Parameters");

            $level = new Level();
            $level->max_attempts = filter_var($arguments["max_attempts"], FILTER_SANITIZE_STRING);
            $level->distance = filter_var($arguments["distance"], FILTER_SANITIZE_STRING);
            $level->time = filter_var($arguments["time"], FILTER_SANITIZE_STRING);
            if ($level->save())
                return $this->json_success($res, 200, json_encode($level));
            else
                return $this->json_error($res, 500, "Erreur d'ajout");
        }

        public function getHints($req, $resp, $args){
            try {
                $destination = Destination::where('id', '=', $args['id'])->firstOrFail();
                return $this->json_success($resp, 200, json_encode($destination->hints));
            }catch (ModelNotFoundException $mne){
                return $this->json_error($resp, 404, "Ressource non trouvée");
            }
    }


        //TODO service updateLevel, updatePlace, updateDestination (FILE), Settings, hints

}