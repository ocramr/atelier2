<?php
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 6/02/17
 * Time: 14:24
 */

namespace app\controller;

use app\model\Game;
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
        //die("ddd");
    }

    public function ranking($req, $resp, $args){
        return $this->json_success($resp, 200, Game::orderBy('score')->get());
    }

}