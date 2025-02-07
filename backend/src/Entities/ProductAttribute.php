<?php
namespace App\Entities;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity]
#[ORM\Table(name: 'product_attributes')]
class ProductAttribute extends BaseEntity
{
    #[ORM\ManyToOne(targetEntity: Product::class, inversedBy: 'attributes')]
    #[ORM\JoinColumn(name: 'product_id', referencedColumnName: 'id')]
    private Product $product;

    #[ORM\Column(type: Types::STRING, length: 32)]
    private string $name;

    #[ORM\Column(type: Types::STRING, length: 32)]
    private string $type;

    #[ORM\OneToMany(targetEntity: AttributeItem::class, mappedBy: 'attribute', fetch: "EAGER")]
    private Collection $attributeItems;

    public function __construct()
    {
        $this->attributeItems = new ArrayCollection();
    }

    public function getDTO(): array
    {
        $attributeItems = array_map(fn($element) => $element->getDTO(), $this->attributeItems->toArray());
        return ['id' => $this->id, 'name' => $this->name, 'type' => $this->type, 'attributeItems' => $attributeItems];
    }
}