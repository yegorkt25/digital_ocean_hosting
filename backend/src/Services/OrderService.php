<?php

namespace App\Services;

use App\Entities\Order;
use App\Entities\Product;
use App\Entities\OrderDetail;
use App\Entities\OrderStatus;
use App\Entities\AttributeItem;
use App\Services\IOrderService;
use Doctrine\ORM\EntityManager;
use App\Entities\OrderDetailsAttribute;

class OrderService implements IOrderService
{
    private readonly EntityManager $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function addOrder(OrderStatus $status = OrderStatus::PROCESSING)
    {
        $order = new Order();
        $order->status = $status;

        $this->entityManager->persist($order);
        $this->entityManager->flush();

        return $order->getDTO();
    }

    public function addOrderDetail(int $orderId, int $productId, int $quantity)
    {
        $order = $this->entityManager->getRepository(Order::class)->find($orderId);
        if (!$order) {
            throw new \Exception('Order not found');
        }

        $product = $this->entityManager->getRepository(Product::class)->find($productId);
        if (!$product) {
            throw new \Exception('Product not found');
        }

        $orderDetail = new OrderDetail();
        $orderDetail->order = $order;
        $orderDetail->product = $product;
        $orderDetail->quantity = $quantity;

        if (!$product->isInStock) {
            throw new \Exception('Product is not in stock');
        }

        $this->entityManager->persist($orderDetail);
        $this->entityManager->flush();

        return $orderDetail->getDTO();
    }

    public function addProductAttribute(int $orderDetailId, int $attributeItemId)
    {
        $orderDetail = $this->entityManager->getRepository(OrderDetail::class)->find($orderDetailId);
        if (!$orderDetail) {
            throw new \Exception('Order detail not found');
        }

        $attributeItem = $this->entityManager->getRepository(AttributeItem::class)->find($attributeItemId);
        if (!$attributeItem) {
            throw new \Exception('Attribute item not found');
        }

        $product = $orderDetail->product;
        $productAttributes = $product->attributes;
        $isValidAttribute = false;
        $parentAttribute = null;

        foreach ($productAttributes as $productAttribute) {
            foreach ($productAttribute->attributeItems as $item) {
                if ($item->id === $attributeItem->id) {
                    $isValidAttribute = true;
                    $parentAttribute = $productAttribute;
                    break 2;
                }
            }
        }

        if (!$isValidAttribute) {
            throw new \Exception('Attribute item does not belong to the product');
        }

        $existingAttributes = $orderDetail->attributes;
        foreach ($existingAttributes as $existingAttribute) {
            if ($existingAttribute->attributeItem->attribute->id === $parentAttribute->id) {
                throw new \Exception('An attribute item is already selected for this product attribute');
            }
        }

        $productAttribute = new OrderDetailsAttribute;

        $productAttribute->orderDetail = $orderDetail;
        $productAttribute->attributeItem = $attributeItem;

        $this->entityManager->persist($productAttribute);
        $this->entityManager->flush();

        $order = $orderDetail->order;

        return $order->getDTO();
    }
}
