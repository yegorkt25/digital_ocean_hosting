<?php

namespace App;

require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;
use Doctrine\ORM\ORMSetup;
use Doctrine\ORM\EntityManager;
use Doctrine\DBAL\DriverManager;

class DBConn
{
    private static $obj;

    public static function getConn(): EntityManager
    {
        if (!isset(self::$obj)) {
            $dotenv = Dotenv::createImmutable(__DIR__);
            $dotenv->load();

            $config = ORMSetup::createAttributeMetadataConfiguration(
                paths: [__DIR__],
                isDevMode: true,
            );

            $connection = DriverManager::getConnection([
                'dbname' => $_ENV['DBNAME'],
                'user' => $_ENV['USER'],
                'password' => $_ENV['PASSWORD'],
                'host' => $_ENV['HOST'],
                'driver' => 'pdo_mysql',

            ], $config);
            self::$obj = new EntityManager($connection, $config);
        }
        return self::$obj;
    }
}