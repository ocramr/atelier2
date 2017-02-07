<?php
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 6/02/17
 * Time: 14:24
 */

namespace app\controller;


use Interop\Container\ContainerInterface;
use \app\model\Game;
use \app\model\Destination;
use \app\model\Place;
use \app\model\Hint;


class GameController extends AbstractController
{

    public function __construct(ContainerInterface $container)
    {
        parent::__construct($container);
    }
    public function playGame($req, $res, $args)
    {
        $tab = array();
        $factory = new \RandomLib\Factory;
        $generator = $factory->getMediumStrengthGenerator();

        $game = new Game;
        $game->pseudo = filter_var($req->getParsedBody()['pseudo'], FILTER_SANITIZE_STRING);
        $game->token = $generator->generateString(32, 'abcdefghijklmnopqrstuvwxyz123456789');
        $game->id_level = filter_var($req->getParsedBody()['level'], FILTER_VALIDATE_INT);

        $destination = Destination::all()->random(1);
        $game->id_destination = $destination->id;

        $places = Place::all()->random(5);
        $game->save();
        foreach($places as $place)
        {
            $p = Place::where('id', '=', $place->id)->firstOrFail();
            $game->places()->attach($p);
            $tab[] = array("name" => $p->name,
                            "lng" => $p->lng,
                            "lat" => $p->lat,
                            "indication" => $p->indication,
                            "type_indication"=> $p->type_indication);
        }
        $hints = Hint::where('id_destination', '=', $destination->id)->get();
        $game_details[] = array("id_game" => $game->id,
                        "token" => $game->token,
                        "pseudo" => $game->pseudo,
                        "destination" => array(
                                "name" => $destination->name,
                                "lng" => $destination->lng,
                                "lat" => $destination->lat,
                                "hints" => $hints->toArray()
                        ),
                        "places" => $tab
        );
        if($game->save())
           return $this->json_success($res, 200, json_encode($game_details));
        else
           return $this->json_error($res, 200, 'Erreur de création de la partie');
        
    }

}