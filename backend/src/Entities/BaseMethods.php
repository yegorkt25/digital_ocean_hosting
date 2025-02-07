<?php

namespace App\Entities;

use ReflectionClass;

abstract class BaseMethods
{
    public function __get($property)
    {
        if (property_exists($this, $property)) {
            $reflection = new ReflectionClass($this);
            $prop = $reflection->getProperty($property);

            if ($prop->isProtected() || $prop->isPrivate()) {
                $prop->setAccessible(true);
            }

            return $prop->getValue($this);
        }

        trigger_error("Undefined property: " . $property . " " . $this, E_USER_NOTICE);
        return null;
    }

    public function __set($property, $value)
    {
        if (property_exists($this, $property)) {

            $reflection = new ReflectionClass($this);
            $prop = $reflection->getProperty($property);

            if ($prop->isProtected() || $prop->isPrivate()) {
                $prop->setAccessible(true);
            }

            $prop->setValue($this, $value);
        } else {
            trigger_error("Cannot set undefined property: " . $property . " " . $this::class, E_USER_NOTICE);
        }

        return $this;
    }

    public abstract function getDTO();
}