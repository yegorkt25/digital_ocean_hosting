<?php

namespace App\Entities;

use App\Entities\Order;
use App\Entities\Product;
use App\Entities\BaseEntity;
use Doctrine\ORM\Mapping as ORM;
use App\Entities\OrderDetailsAttribute;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity]
#[ORM\Table(name: 'order_details')]
class OrderDetail extends BaseEntity
{
    #[ORM\ManyToOne(targetEntity: Order::class, inversedBy: "orderDetails", fetch: "EAGER")]
    #[ORM\JoinColumn(nullable: false, onDelete: "CASCADE")]
    private Order $order;

    #[ORM\ManyToOne(targetEntity: Product::class, fetch: "EAGER")]
    #[ORM\JoinColumn(nullable: false, onDelete: "CASCADE")]
    private Product $product;

    #[ORM\Column(type: "integer")]
    private int $quantity;

    #[ORM\OneToMany(targetEntity: OrderDetailsAttribute::class, mappedBy: "orderDetail", cascade: ["persist", "remove"], orphanRemoval: true)]
    private Collection $attributes;

    public function __construct()
    {
        $this->attributes = new ArrayCollection();
    }

    public function getDTO(): array
    {
        $attributes = array_map(fn($element) => $element->getDTO(), $this->attributes->toArray());
        return [
            'id' => $this->id,
            'product' => $this->product->getDTO(),
            'quantity' => $this->quantity,
            'attributes' => $attributes
        ];
    }
}