<?php

/**
 * Created by PhpStorm.
 * User: marco
 * Date: 14/10/16
 * Time: 10:49
 */
namespace app;

use \Illuminate\Database\Capsule\Manager;

class AppInit
{
    public static function bootEloquent($file){
        $conf = parse_ini_file($file);
        $db = new Manager();
        $db->addConnection($conf);
        $db->setAsGlobal();
        $db->bootEloquent();
        Manager::connection()->enableQueryLog();
    }
}