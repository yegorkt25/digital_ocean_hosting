<?php

namespace App\Services;

use App\Entities\Product;
use App\Entities\Category;
use Doctrine\ORM\EntityManager;
use App\Services\IProductService;

class ProductService implements IProductService
{
    private readonly EntityManager $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getAllProducts(string|null $category = 'all'): array
    {
        if (is_null($category) || $category === 'all') {
            $products = $this->entityManager->getRepository(Product::class)->findAll();

            $productDTOs = array_map(fn($item) => $item->getDTO(), $products);
            return $productDTOs;
        }

        $categoryEntity = $this->entityManager->getRepository(Category::class)->findOneBy(['name' => $category]);

        $productDTOs = array_map(fn($item) => $item->getDTO(), $categoryEntity->products->toArray());

        return $productDTOs;
    }

    public function getProductById(int $id): array
    {
        $product = $this->entityManager->getRepository(Product::class)->find($id);
        return $product->getDTO();
    }

    public function getAllCategories(): array
    {
        $categories = $this->entityManager->getRepository(Category::class)->findAll();

        $categoryDTOs = array_map(fn($item) => $item->getDTO(), $categories);

        return $categoryDTOs;
    }
}
