<?php
namespace App\Entities;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity]
#[ORM\Table(name: 'products')]
class Product extends BaseEntity
{
    #[ORM\Column(type: Types::STRING, length: 32)]
    protected string $name;

    #[ORM\Column(type: Types::BOOLEAN, name: 'is_in_stock')]
    protected bool $isInStock;

    #[ORM\Column(type: Types::TEXT)]
    protected string $description;

    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: 'products', fetch: 'EAGER')]
    #[ORM\JoinColumn(name: 'category_id', referencedColumnName: 'id')]
    protected Category $category;

    #[ORM\Column(type: Types::STRING, length: 32)]
    protected string $brand;

    #[ORM\OneToMany(targetEntity: ProductGallery::class, mappedBy: 'product')]
    protected Collection $gallery;

    #[ORM\OneToMany(targetEntity: ProductAttribute::class, mappedBy: 'product', fetch: 'EAGER')]
    protected Collection $attributes;

    #[ORM\OneToMany(targetEntity: ProductPrice::class, mappedBy: 'product')]
    protected Collection $prices;

    public function __construct()
    {
        $this->gallery = new ArrayCollection();
        $this->attributes = new ArrayCollection();
        $this->prices = new ArrayCollection();
    }

    public function getDTO(): array
    {
        $gallery = array_map(fn($element) => $element->getDTO(), $this->gallery->toArray());
        $attributes = array_map(fn($element) => $element->getDTO(), $this->attributes->toArray());
        $prices = array_map(fn($element) => $element->getDTO(), $this->prices->toArray());
        return [
            'id' => $this->id,
            'name' => $this->name,
            'isInStock' => $this->isInStock,
            'description' => $this->description,
            'category' => $this->category->getDTO(),
            'brand' => $this->brand,
            'gallery' => $gallery,
            'attributes' => $attributes,
            'prices' => $prices
        ];
    }
}