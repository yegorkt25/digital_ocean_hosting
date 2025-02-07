<?php
namespace App\Entities;

use App\Entities\BaseMethods;
use App\Entities\OrderDetail;
use App\Entities\AttributeItem;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'order_details_attributes')]
class OrderDetailsAttribute extends BaseMethods
{
    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: OrderDetail::class, inversedBy: "attributes")]
    #[ORM\JoinColumn(name: "order_detail_id", referencedColumnName: "id", onDelete: "CASCADE")]
    private OrderDetail $orderDetail;

    #[ORM\Id]
    #[ORM\ManyToOne(targetEntity: AttributeItem::class)]
    #[ORM\JoinColumn(name: "attribute_item_id", referencedColumnName: "id", onDelete: "CASCADE")]
    private AttributeItem $attributeItem;

    public function getDTO(): array
    {
        return ['attributeItem' => $this->attributeItem->getDTO()];
    }
}