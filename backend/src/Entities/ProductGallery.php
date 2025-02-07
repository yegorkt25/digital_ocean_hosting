<?php
namespace App\Entities;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'product_gallery')]
class ProductGallery extends BaseEntity
{
    #[ORM\ManyToOne(targetEntity: Product::class, inversedBy: 'gallery')]
    #[ORM\JoinColumn(name: 'product_id', referencedColumnName: 'id')]
    private Product $product;

    #[ORM\Column(type: Types::STRING, name: 'image_url')]
    private string $imageUrl;

    public function getDTO()
    {
        return ['imageUrl' => $this->imageUrl];
    }
}