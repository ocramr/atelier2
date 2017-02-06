<?php

namespace app\controller;

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
}