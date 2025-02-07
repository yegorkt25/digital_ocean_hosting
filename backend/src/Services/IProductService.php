<?php

namespace App\Services;

interface IProductService
{
    public function getAllProducts(string $category = 'all');
    public function getProductById(int $id);
    public function getAllCategories();
}
