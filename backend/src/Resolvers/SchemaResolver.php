<?php
namespace App\Resolvers;

use GraphQL\Type\Schema;
use App\Entities\OrderStatus;
use App\Services\IOrderService;
use App\Services\IProductService;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\EnumType;
use GraphQL\Type\Definition\ObjectType;

class SchemaResolver
{
    private readonly IProductService $productService;
    private readonly IOrderService $orderService;

    public function __construct(IProductService $productService, IOrderService $orderService)
    {
        $this->productService = $productService;
        $this->orderService = $orderService;
    }

    public function getSchema(): Schema
    {

        $categoryType = new ObjectType([
            'name' => 'Category',
            'fields' => [
                'id' => Type::int(),
                'name' => Type::string(),
            ],
        ]);

        $itemType = new ObjectType([
            'name' => 'Item',
            'fields' => [
                'id' => Type::int(),
                'value' => Type::string(),
                'displayValue' => Type::string(),
            ],
        ]);

        $attributeType = new ObjectType([
            'name' => 'Attribute',
            'fields' => [
                'id' => Type::int(),
                'name' => Type::string(),
                'type' => Type::string(),
                'attributeItems' => Type::listOf($itemType),
            ],
        ]);

        $currencyType = new ObjectType([
            'name' => 'Currency',
            'fields' => [
                'label' => Type::string(),
                'symbol' => Type::string(),
            ],
        ]);

        $priceType = new ObjectType([
            'name' => 'Price',
            'fields' => [
                'price' => Type::float(),
                'currency' => $currencyType,
            ],
        ]);

        $galleryType = new ObjectType([
            'name' => 'Gallery',
            'fields' => [
                'imageUrl' => Type::string(),
            ]
        ]);

        $productType = new ObjectType([
            'name' => 'Product',
            'fields' => [
                'id' => Type::int(),
                'name' => Type::string(),
                'isInStock' => Type::boolean(),
                'description' => Type::string(),
                'category' => $categoryType,
                'brand' => Type::string(),
                'gallery' => Type::listOf($galleryType),
                'attributes' => Type::listOf($attributeType),
                'prices' => Type::listOf($priceType),
            ],
        ]);

        $orderStatusType = new EnumType([
            'name' => 'OrderStatus',
            'values' => [
                'PENDING' => ['value' => 'PENDING'],
                'PROCESSING' => ['value' => 'PROCESSING'],
                'COMPLETED' => ['value' => 'COMPLETED'],
                'CANCELLED' => ['value' => 'CANCELLED'],
            ],
        ]);

        $orderDetailsAttributeType = new ObjectType([
            'name' => 'OrderDetailsAttribute',
            'fields' => [
                'attributeItem' => $itemType
            ]
        ]);

        $orderDetailType = new ObjectType([
            'name' => 'OrderDetail',
            'fields' => [
                'id' => Type::int(),
                'product' => $productType,
                'quantity' => Type::int(),
                'attributes' => Type::listOf($orderDetailsAttributeType),
            ],
        ]);

        $orderType = new ObjectType([
            'name' => 'Order',
            'fields' => [
                'id' => Type::int(),
                'status' => $orderStatusType,
                'createdAt' => Type::string(),
                'updatedAt' => Type::string(),
                'orderDetails' => Type::listOf($orderDetailType),
            ],
        ]);



        $queryType = new ObjectType([
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf($productType),
                    'args' => [
                        'category' => Type::getNullableType(Type::string()),
                    ],
                    'resolve' => fn($root, $args) => $this->productService->getAllProducts(isset($args['category']) ? $args['category'] : 'all'),
                ],
                'product' => [
                    'type' => $productType,
                    'args' => [
                        'id' => Type::nonNull(Type::int()),
                    ],
                    'resolve' => fn($root, $args) => $this->productService->getProductById($args['id']),
                ],
                'categories' => [
                    'type' => Type::listOf($categoryType),
                    'resolve' => fn() => $this->productService->getAllCategories(),
                ]
            ],
        ]);

        $mutationType = new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'createOrder' => [
                    'type' => $orderType,
                    'resolve' => function ($root, $args) {
                        return $this->orderService->addOrder(
                            OrderStatus::PROCESSING
                        );
                    },
                ],
                'addOrderDetail' => [
                    'type' => $orderDetailType,
                    'args' => [
                        'orderId' => Type::nonNull(Type::int()),
                        'productId' => Type::nonNull(Type::int()),
                        'quantity' => Type::nonNull(Type::int()),
                    ],
                    'resolve' => function ($root, $args) {
                        return $this->orderService->addOrderDetail(
                            $args['orderId'],
                            $args['productId'],
                            $args['quantity']
                        );
                    },
                ],
                'addOrderDetailAttribute' => [
                    'type' => $orderType,
                    'args' => [
                        'orderDetailId' => Type::nonNull(Type::int()),
                        'attributeItemId' => Type::nonNull(Type::int()),
                    ],
                    'resolve' => function ($root, $args) {
                        return $this->orderService->addProductAttribute(
                            $args['orderDetailId'],
                            $args['attributeItemId']
                        );
                    },
                ]
            ],
        ]);

        return new Schema([
            'query' => $queryType,
            'mutation' => $mutationType,
        ]);
    }
}
