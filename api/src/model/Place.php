<?php

/**
 * Created by PhpStorm.
 * User: marco
 * Date: 6/02/17
 * Time: 14:19
 */
namespace app\model;

class Place extends \Illuminate\Database\Eloquent\Model
{
    protected $table = 'place';
    protected $timestamps = false;

    public function games(){
        return $this->belongsToMany('app\model\Game', 'place_game', 'id_place','id_game');
    }
}