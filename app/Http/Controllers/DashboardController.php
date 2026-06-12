<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $categoryCount    = Category::count();
        $productCount     = Product::count();
        $activeProductCount = Product::where('status', true)->count();
        $totalStock       = Product::sum('stock');

        $recentProducts = Product::query()
            ->with('category:id,name')
            ->latest()
            ->take(5)
            ->get(['id', 'name', 'category_id', 'image', 'slug', 'price', 'stock', 'status'])
            ->map(fn (Product $product) => [
                'id'       => $product->id,
                'name'     => $product->name,
                'slug'     => $product->slug,
                'price'    => $product->price,
                'stock'    => $product->stock,
                'image_url' => $product->image ? Storage::url($product->image) : null,
                'category' => $product->category,
                'status'   => (bool) $product->status,
            ]);

        return Inertia::render('dashboard', [
            'stats' => [
                [
                    'label'  => 'Categories',
                    'value'  => $categoryCount,
                    'helper' => 'Total product categories',
                ],
                [
                    'label'  => 'Products',
                    'value'  => $productCount,
                    'helper' => 'Total products in inventory',
                ],
                [
                    'label'  => 'Active Products',
                    'value'  => $activeProductCount,
                    'helper' => 'Visible in catalog',
                ],
                [
                    'label'  => 'Total Stock',
                    'value'  => $totalStock,
                    'helper' => 'Units available across all products',
                ],
            ],
            'recentProducts' => $recentProducts,
        ]);
    }
}
