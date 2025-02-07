<?php
namespace App\Entities;

use App\Entities\Product;
use App\Entities\BaseEntity;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity]
#[ORM\Table(name: 'categories')]
class Category extends BaseEntity
{
    #[ORM\Column(type: Types::STRING, length: 32)]
    protected string $name;

    #[ORM\OneToMany(targetEntity: Product::class, mappedBy: 'category', fetch: 'EAGER')]
    protected Collection $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

    public function getDTO(): array
    {
        return ['id' => $this->id, 'name' => $this->name];
    }
}