<?php
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 6/02/17
 * Time: 14:24
 */

namespace app\controller;

use \app\model\Game;
use \app\model\Destination;
use app\model\Level;
use \app\model\Place;
use \app\model\Hint;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class GameController extends AbstractController
{

    public function save(Request $request, Response $response, $args){
        try {
            $id = $args['id'];
            $game = Game::where('id', '=', $args['id'])->findOrFail();
            $data = $request->getParsedBody();
            if(!isset($data['score']))   return $this->json_error($response, 400, "Paramètre Manquant : Score");
            else if(!isset($data['duration']))   return $this->json_error($response, 400, "Paramètre Manquant : Duration");
            else{
                $game->score = filter_var($data['score'], FILTER_SANITIZE_NUMBER_INT);
                $game->duration = filter_var($data['duration'], FILTER_SANITIZE_NUMBER_INT);
                $game->state = GAME::STATUS_FINISHED;
                if($game->update()>0){
                    return $this->json_success($response, 200, $game->toJson());
                }else{
                    return $this->json_error($response, 400, "Erreur pour l'update");
                }
            }

        }catch (ModelNotFoundException $mne){
            return $this->json_error($response, 400, "Partie non trouvé");
        }
    }
    public function playGame($req, $res, $args)
    {
        $data = $req->getParsedBody();
        if(!isset($data['pseudo'])) return $this->json_error($res, 400, "Paramètre manquante : pseudo");
        if(!isset($data['level'])) return $this->json_error($res, 400, "Paramètre manquante : level");
        else {
            $tab = array();
            $factory = new \RandomLib\Factory;
            $generator = $factory->getMediumStrengthGenerator();
            try {
                $game = new Game();
                $game->pseudo = filter_var($data['pseudo'], FILTER_SANITIZE_STRING);
                $game->token = $generator->generateString(32, 'abcdefghijklmnopqrstuvwxyz123456789');
                $level_id = filter_var($data['level'], FILTER_SANITIZE_NUMBER_INT);
                $level = Level::where('id', '=', $level_id)->firstOrFail();
                $game->level()->associate($level);
                $destination = Destination::all()->random(1);
                $game->destination()->associate($destination);
                $places = Place::all()->random(5);
                if ($game->save()) {
                    foreach ($places as $place) {
                        $p = Place::where('id', '=', $place->id)->firstOrFail();
                        $game->places()->attach($p);
                        $tab[] = array("name" => $p->name,
                            "lng" => $p->lng,
                            "lat" => $p->lat,
                            "indication" => $p->indication,
                            "type_indication" => $p->type_indication);
                    }
                    $hints = Hint::where('id_destination', '=', $destination->id)->get();
                    $game_details = ["id_game" => $game->id,
                        "token" => $game->token,
                        "pseudo" => $game->pseudo,
                        "level"=>$game->level,
                        "destination" => array(
                            "name" => $destination->name,
                            "lng" => $destination->lng,
                            "lat" => $destination->lat,
                            "hints" => $hints->toArray()
                        ),
                        "places" => $tab]
                    ;
                    if ($game->save())
                        return $this->json_success($res, 200, json_encode($game_details));
                    else
                        return $this->json_error($res, 400, 'Erreur pour la création des lieux');
                } else{
                    return $this->json_error($res, 400, 'Erreur de création de la partie');
                }

            }catch (ModelNotFoundException $mne){
                return $this->json_error($res, 400, "Niveau non trouvé");
            }
        }
        
    }

    public function ranking($req, $resp, $args){
        return $this->json_success($resp, 200, Game::select('pseudo', 'duration', 'score', 'state', 'id_level', 'id_destination')
                                                    ->where('state',"=",Game::STATUS_FINISHED)
                                                    ->with('level')
                                                    ->with('destination')
                                                    ->orderBy('score', 'DESC')
                                                    ->get()
                                                    );
    }

}