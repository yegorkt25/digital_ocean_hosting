<?php

namespace App\Services;

use App\Entities\OrderStatus;

interface IOrderService
{
    public function addOrder(OrderStatus $status = OrderStatus::PROCESSING);
    public function addOrderDetail(int $orderId, int $productId, int $quantity);
    public function addProductAttribute(int $orderDetailId, int $attributeItemId);
}