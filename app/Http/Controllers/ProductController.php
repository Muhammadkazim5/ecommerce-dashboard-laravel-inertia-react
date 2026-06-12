<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Category;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() :Response
    {
        $products = Product::query()
            ->with('category:id,name')
            ->latest()
            ->get(['id', 'name', 'slug', 'price', 'status', 'category_id', 'description', 'stock', 'image'])
            ->map(fn (Product $product) => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => $product->price,
                'category_id' => $product->category_id,
                'description' => $product->description,
                'stock' => $product->stock,
                'image_url' => $product->image ?  Storage::url($product->image) : null,
                'category' => $product->category,
                'status' => (bool) $product->status,

            ]);
            $categories = Category::query()
                 ->where('status', true)
                 ->orderBy('name')
                 ->get(['id', 'name']);
        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => $categories,
            'message' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('products')],
            'price' => ['required', 'numeric'],
            'category_id' => ['required', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'stock' => ['required', 'integer'],
            'image' => ['nullable', 'image', 'max:2048'],
            'status' => ['boolean'],
        ]);
        
        $validated['status'] =$request->boolean('status');

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        Product::create($validated);

        return back()->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
         $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('products')->ignore($product->id)],
            'price' => ['required', 'numeric'],
            'category_id' => ['required', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'stock' => ['required', 'integer'],
            'image' => ['nullable', 'image', 'max:2048'],
            'status' => ['boolean'],
        ]);

        $validated['status'] = $request->boolean('status');

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($validated);
        return back()->with('success', 'Product updated successfully.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
        return back()->with('success', 'Product deleted successfully.');
    }
}
