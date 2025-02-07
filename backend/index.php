<?php

use App\DBConn;
use App\Controller\GraphQL;
use App\Services\OrderService;
use App\Services\IOrderService;
use Doctrine\ORM\EntityManager;
use App\Services\ProductService;
use App\Resolvers\SchemaResolver;
use App\Services\IProductService;

require_once __DIR__ . '/vendor/autoload.php';

//CORS
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Registration of services in DI container 
$builder = new DI\ContainerBuilder();
$builder->addDefinitions([
    EntityManager::class => DI\Factory([DBConn::class, 'getConn']),
    IProductService::class => DI\autowire(ProductService::class),
    IOrderService::class => DI\autowire(OrderService::class),
    SchemaResolver::class => DI\autowire(SchemaResolver::class),
    GraphQL::class => DI\autowire(GraphQL::class),
]);

$container = $builder->build();

$dispatcher = FastRoute\simpleDispatcher(function (FastRoute\RouteCollector $r) {
    $r->addRoute('POST', '/graphql', [GraphQL::class, 'handle']);
});

$routeInfo = $dispatcher->dispatch(
    $_SERVER['REQUEST_METHOD'],
    $_SERVER['REQUEST_URI']
);

switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        $allowedMethods = $routeInfo[1];
        break;
    case FastRoute\Dispatcher::FOUND:
        [$controllerClass, $method] = $routeInfo[1];
        $vars = $routeInfo[2];

        $controller = $container->get($controllerClass);

        echo call_user_func_array([$controller, $method], $vars);
        break;
}