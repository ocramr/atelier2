<?php

/**
 * Created by PhpStorm.
 * User: marco
 * Date: 6/02/17
 * Time: 14:42
 */
namespace app\model;

class Hint extends \Illuminate\Database\Eloquent\Model
{
    protected $table = 'hint';
    public $timestamps = false;

    public function destination(){
        return $this->belongsTo('app\model\Destination','id_destination');
    }
}