<?php


namespace app\util;
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 5/02/17
 * Time: 19:11
 */
class Util
{

    //Upload file to /img only!!
    public static function uploadFromData($data, $nameOfPic) {
        $ext = null;
        $pos  = strpos($data, ';');
        $type = explode('/', substr($data, 0, $pos))[1];
        $ext = ".$type";
        $data = str_replace(substr($data,0, strpos($data,',')+1), '', $data);
        if($ext != null) {
            $image = base64_decode($data);
            $nameOfPic = str_replace(' ', '',$nameOfPic.$ext);
            $result = file_put_contents('../img/'.$nameOfPic, $image);
            if($result !== FALSE) {
                return $nameOfPic;
            }else{
                throw new \Exception("Problem saving file: $nameOfPic");
            }
        }else{
            throw new \Exception("Extension not found: $data");
        }

    }
}









