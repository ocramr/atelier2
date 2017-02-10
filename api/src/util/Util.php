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
        
        if(strpos($data, 'data:image/jpeg;base64,') === 0) {
            $data = str_replace('data:image/jpeg;base64,', '', $data);
            $ext = '.jpg';
        } elseif (strpos($data, 'data:image/jpg;base64,') === 0) {
            $data = str_replace('data:image/jpg;base64,', '', $data);
            $ext = '.jpg';
        } elseif (strpos($data, 'data:image/png;base64,') === 0) {
            $data = str_replace('data:image/png;base64,', '', $data);
            $ext = '.png';
        } elseif (strpos($data, 'data:image/gif;base64,') === 0) {
            $data = str_replace('data:image/gif;base64,', '', $data);
            $ext = '.gif';
        }

        if($ext != null) {

            $image = base64_decode($data);
            $nameOfPic = $nameOfPic.$ext;
            if(file_put_contents('../img/'.$nameOfPic, $image) !== FALSE) {
                return $nameOfPic;
            }
        }
        
        return false;
    }
}









