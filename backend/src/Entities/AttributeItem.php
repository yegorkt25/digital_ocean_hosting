<?php
namespace App\Entities;

use App\Entities\BaseEntity;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Entities\ProductAttribute;

#[ORM\Entity]
#[ORM\Table(name: 'attribute_items')]
class AttributeItem extends BaseEntity
{
    #[ORM\ManyToOne(targetEntity: ProductAttribute::class, inversedBy: 'attributeItems')]
    #[ORM\JoinColumn(name: 'attribute_id', referencedColumnName: 'id')]
    private ProductAttribute $attribute;

    #[ORM\Column(type: Types::STRING, length: 32, name: 'display_value')]
    private string $displayValue;

    #[ORM\Column(type: Types::STRING, length: 32)]
    private string $value;

    public function getDTO(): array
    {
        return ['id' => $this->id, 'displayValue' => $this->displayValue, 'value' => $this->value];
    }
}