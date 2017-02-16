<?php


namespace app\model;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'user';
    public $timestamps = false;
    protected $hidden = ['password'];
}