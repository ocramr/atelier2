<?php

/**
 * Created by PhpStorm.
 * User: marco
 * Date: 6/02/17
 * Time: 14:08
 */
namespace app\model;

class Destination extends \Illuminate\Database\Eloquent\Model
{
    protected $table = 'destination';
    public $timestamps = false;

    public function games(){
        return $this->hasMany('app\model\Game','id_destination');
    }

    public function hints(){
        return $this->hasMany('app\model\Hint','id_destionation');
    }
}