<?php

/**
 * Created by PhpStorm.
 * User: marco
 * Date: 6/02/17
 * Time: 14:09
 */
namespace app\model;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    protected $table = 'level';
    public $timestamps = false;

    public function games(){
        return $this->hasMany('app\model\Game','id_level');
    }
}