<?php

namespace app\controller;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use \app\model\Place;
use \app\model\Hint;
use \app\util\Util;
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

            $data = $req->getParsedBody();
            if(!isset($data['name'])) return $this->json_error($resp, 400, "Missing Param name");
            if(!isset($data['lng'])) return $this->json_error($resp, 400, "Missing Param lng");
            if(!isset($data['lat'])) return $this->json_error($resp, 400, "Missing Param lat");
            if(!isset($data['type_indication'])) return $this->json_error($resp, 400, "Missing Param type indication");
            if(!isset($data['indication'])) return $this->json_error($resp, 400, "Missing Param indication");
            try{       
                $place = Place::where('id', '=',$args['id'])->firstOrFail();
                $place->name = $data['name'];
                $place->lng = $data['lng'];
                $place->lat = $data['lat'];
                $place->type_indication = $data['type_indication'];
                if($place->type_indication == 'text'){
                    $place->indication = str_replace(' ','',$data['indication']);
                    $place->indication = $place->indication;
                }else{
                    try{
                        $indication = Util::uploadFromData($data['indication'], $data['name']);
                        $place->indication = 'img/'.str_replace(' ','',$indication);
                        $place->indication = $place->indication;
                        $place->type_indication = 'url';
                    }catch (\Exception $e){
                        return $this->json_error($resp, 400, $e->getMessage());
                    }
                }
                if($place->save()){
                    return $this->json_success($resp, 201, $place->toJson());
                }else{
                    return $this->json_error($resp, 500, "Erreur d'ajout");
                }
            }
            catch(ModelNotFoundException $e){
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

            $data = $req->getParsedBody();
            if(!isset($data['name'])) return $this->json_error($resp, 400, "Missing Param name");
            if(!isset($data['lng'])) return $this->json_error($resp, 400, "Missing Param lng");
            if(!isset($data['lat'])) return $this->json_error($resp, 400, "Missing Param lat");
            if(!isset($data['type_indication'])) return $this->json_error($resp, 400, "Missing Param type indication");
            if(!isset($data['indication'])) return $this->json_error($resp, 400, "Missing Param indication");

            $newPlace = new Place();
            $newPlace->name = $data['name'];
            $newPlace->lng = $data['lng'];
            $newPlace->lat = $data['lat'];
            $newPlace->type_indication = $data['type_indication'];
            if($newPlace->type_indication == 'text'){
                $newPlace->indication = str_replace(' ', '', data['indication']);
                $newPlace->indication = $newPlace->indication;
            }else{
                try{
                    $indication = Util::uploadFromData($data['indication'], $data['name']);
                    $newPlace->indication = 'img/'.str_replace(' ', '',$indication);
                    $newPlace->indication =  $newPlace->indication;
                    $newPlace->type_indication = 'url';
                }catch (\Exception $e){
                    return $this->json_error($resp, 400, $e->getMessage());
                }
              }
            if($newPlace->save()){
                return $this->json_success($resp, 201, $newPlace->toJson());
            }else{
                return $this->json_error($resp, 500, "Erreur d'ajout");
            }

        }

        public function updateLevel($req, $res, $args)
        {
            $arguments = $req->getParsedBody();
            if (!isset($arguments["max_attempts"]) || !isset($arguments["distance"]) || !isset($arguments["time"]))
                return $this->json_error($res, 400, "Missing Parameters");

            $level = Level::where("id", "=", $args["id"])->firstOrFail();
            $level->name = filter_var($arguments["name"], FILTER_SANITIZE_STRING);
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

        public function addHint($req, $resp, $args){
            $data = $req->getParsedBody();

            if(!isset($data['value'])) return $this->json_error($resp, 400, "Missing Param value");

            $newHint = new Hint();
            $newHint->value = $data['value'];
            $newHint->id_destination = $args['id_Dest'];

            $value = Util::uploadFromData($data['value'], $newHint->destination->name);

            if($value != false){
                $newHint->value = 'img/'.str_replace(' ','',$value);
                $newHint->value = $newHint->value;
                $newHint->type = 'url';
            } 
            else{
                $newHint->value = str_replace(' ','',$data['value']);
                $newHint->value = $newHint->value;
                $newHint->type = 'text';
            }

            if($newHint->save()) return $this->json_success($resp, 201, $newHint->toJson());

            return $this->json_error($resp, 500, "Erreur d'ajout");
        }


        public function editHint($req, $resp, $args)
        {
            $data = $req->getParsedBody(); 

            try{       
                $hint = Hint::findOrfail($args['id']);                  
            }
            catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
                return $this->json_error($resp, 404, "Not Found");
            }

            if(isset($data['value']))
            {
                $imageName = $hint->destination->name.'_'.time();
                $value = Util::uploadFromData($data['value'], $imageName);
                if($value != false){
                    $hint->value = 'img/'.str_replace(' ','',$value);
                    $hint->type = 'url';
                } 
                else{
                    $hint->value = str_replace(' ',''$data['value']);
                    $hint->value = $hint->value;
                    $hint->type = 'text';
                }
            }
            
            if($hint->save()) return $this->json_success($resp, 200, $hint->toJson());

            return $this->json_error($resp, 500, "Erreur d'ajout");
        }

        public function deleteHint($req, $resp, $args)
        {
            $data = $req->getParsedBody(); 

            try{       
                $hint = Hint::findOrfail($args['id'])->delete();    
                return $this->json_success($resp, 200, ["message"=>"resource deleted"]);              
            }
            catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e){
                return $this->json_error($resp, 404, "Not Found");
            }

            return $this->json_error($resp, 500, "Erreur d'ajout");
        }



        //TODO service updateLevel, updatePlace, updateDestination (FILE), Settings, hints

}