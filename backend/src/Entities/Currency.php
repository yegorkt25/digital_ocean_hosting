<?php
namespace App\Entities;

use App\Entities\BaseEntity;
use App\Entities\ProductPrice;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity]
#[ORM\Table(name: 'currencies')]
class Currency extends BaseEntity
{
    #[ORM\Column(type: Types::STRING, length: 3)]
    protected string $label;

    #[ORM\Column(type: Types::STRING, length: 1)]
    protected string $symbol;

    #[ORM\OneToMany(targetEntity: ProductPrice::class, mappedBy: 'currency')]
    protected Collection $prices;

    public function __construct()
    {
        $this->prices = new ArrayCollection();
        $this->symbol = '';
        $this->label = '';
    }

    public function getDTO(): array
    {
        return ['label' => $this->label, 'symbol' => $this->symbol];
    }
}