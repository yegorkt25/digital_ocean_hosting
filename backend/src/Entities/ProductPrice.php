<?php
namespace App\Entities;

use App\Entities\Product;
use App\Entities\Currency;
use App\Entities\BaseEntity;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'prices')]
class ProductPrice extends BaseEntity
{
    #[ORM\ManyToOne(targetEntity: Product::class, inversedBy: 'prices')]
    #[ORM\JoinColumn(name: 'product_id', referencedColumnName: 'id')]
    private Product $product;

    #[ORM\Column(type: Types::FLOAT)]
    private float $price;

    #[ORM\ManyToOne(targetEntity: Currency::class, inversedBy: 'prices', fetch: 'EAGER')]
    #[ORM\JoinColumn(name: 'currency_id', referencedColumnName: 'id')]
    private Currency $currency;

    public function getDTO(): array
    {
        return ['price' => $this->price, 'currency' => $this->currency->getDTO()];
    }
}