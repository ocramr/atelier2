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
use Interop\Container\ContainerInterface;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class GameController extends AbstractController
{

    public function save(Request $request, Response $response, $args){
        try {
            $id = $args['id'];
            $game = Game::where('id', '=', $args['id'])->findOrFail();
            $game->state = GAME::STATUS_FINISHED;
        }catch (ModelNotFoundException $mne){
            return $this->json_error($response, 400, "Partie non trouvé");
        }
    }
    public function playGame($req, $res, $args)
    {
        //die("ddd");
    }

}