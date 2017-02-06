<?php
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 6/02/17
 * Time: 14:24
 */

namespace app\controller;


use Interop\Container\ContainerInterface;

class UserController extends AbstractController
{

    public function __construct(ContainerInterface $container)
    {
        parent::__construct($container);
    }
}