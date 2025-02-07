<?php
namespace App\Entities;

use DateTime;
use App\Entities\BaseEntity;
use App\Entities\OrderDetail;
use App\Entities\OrderStatus;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity]
#[ORM\Table(name: 'orders')]
class Order extends BaseEntity
{
    #[ORM\Column(type: "string", enumType: OrderStatus::class)]
    private OrderStatus $status;

    #[ORM\Column(type: "datetime", options: ["default" => "CURRENT_TIMESTAMP"], name: "created_at")]
    private DateTime $createdAt;

    #[ORM\Column(type: "datetime", options: ["default" => "CURRENT_TIMESTAMP", "on update" => "CURRENT_TIMESTAMP"], name: "updated_at")]
    private DateTime $updatedAt;

    #[ORM\OneToMany(mappedBy: "order", targetEntity: OrderDetail::class, cascade: ["persist", "remove"], orphanRemoval: true)]
    private Collection $orderDetails;

    public function __construct()
    {
        $this->createdAt = new DateTime();
        $this->updatedAt = new DateTime();
        $this->orderDetails = new ArrayCollection();
    }

    public function getDTO(): array
    {
        $orderDetails = array_map(fn($element) => $element->getDTO(), $this->orderDetails->toArray());
        return [
            'id' => $this->id,
            'status' => $this->status->name,
            'createdAt' => $this->createdAt->format('Y-m-d H:i:s'),
            'updatedAt' => $this->updatedAt->format('Y-m-d H:i:s'),
            'orderDetails' => $orderDetails
        ];
    }
}