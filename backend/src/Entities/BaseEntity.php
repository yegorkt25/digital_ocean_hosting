<?php

namespace App\Entities;

use App\Entities\BaseMethods;
use Doctrine\ORM\Mapping as ORM;

abstract class BaseEntity extends BaseMethods
{
    #[ORM\Id]
    #[ORM\Column(type: 'integer')]
    #[ORM\GeneratedValue]
    protected $id;
}