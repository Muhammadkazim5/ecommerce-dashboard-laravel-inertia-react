import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Head, router, useForm } from '@inertiajs/react'
import React, { FormEvent, useRef, useState } from 'react'
import ProductList from './product-list'
import { Breadcrumb } from '@/components/ui/breadcrumb'
type Category = {
  id: number,
  name: string
}

type Product = {
    id:number,
    category_id: number,
    name: string,
    slug: string,
    stock: number,
    price: string,
    description: string | null ,
    image_url: string | null ,
    category : Category | null
    status:  boolean
}

type ProductForm = {
    name: string,
    category_id: string,
    stock: string,
    slug: string,
    price: string,
    description: string | null ,
    image: File | null ,
    status:  boolean
}

type Props = {
    products: Product[]
    categories: Category[]
    message: string
}

function emptyProductForm(categories: Category[]): ProductForm{
    return {
        category_id: categories[0]?.id ? String(categories[0].id): '',
        name:'',
        slug:'',
        description:'',
        price:'',
        stock:'',
        image:null,
        status:true,
    };
}

const Products = ({ products, categories, message }: Props) => {
    const [editingProduct, setEditingProduct]=useState<Product | null>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    const {data,setData,post,processing,errors,reset,transform}=useForm<ProductForm>(
        emptyProductForm(categories)
    )

    function resetForm(){
        reset();
        setData('category_id', categories[0]?.id ? String(categories[0].id) : '')
        setEditingProduct(null);
        setTimeout(()=>nameInputRef.current?.focus(), 0);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        if(editingProduct){
            transform((currentData)=>({
                ...currentData,
                _method: 'put',
            }));

            post('/products/' + editingProduct.id , {
                forceFormData:true,
                onSuccess: resetForm,
                onFinish: ()=>transform((currentData)=>currentData),
            })

            return;
        }
        transform((currentData)=>currentData);

        post('/products',{
            forceFormData: true,
            onSuccess: resetForm
        })
    }

function handleEdit(product: Product) {
        setEditingProduct(product);
        setData({
            name: product.name,
            slug: product.slug,
            category_id: String(product.category_id),
            description: product.description ?? '',
            price: product.price,
            stock: String(product.stock),
            image: null,
            status: product.status,
        });
        setTimeout(() => nameInputRef.current?.focus(), 0);
    }
    function handleDelete(product: Product) {
        if (!confirm('Delete ' + product.name + '?')) {
            return;
        }
        router.delete('/products/' + product.id);
    }  return (
            <>
            <Head title="Products" />
            <div className="flex h-full flex-col gap-6 rounded-xl p-4">
                <section>
                    <p className="text-sm font-medium text-muted-foreground">
                        Catalog
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                        Product Management
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Create products ,upload images , and keep each product connected to a category.
                    </p>
                    {message && (
                        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                            {message}
                        </div>
                    )}
                    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
                        <section className="rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-sm dark:border-sidebar-border">
                            <h2 className="text-lg font-semibold">
                                {editingProduct
                                    ? 'Edit Product '
                                    : 'Create Product'}
                            </h2>
                            <form
                                className="mt-5 grid gap-4"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        ref={nameInputRef}
                                        autoFocus
                                        tabIndex={1}
                                        value={data.name}
                                        onChange={(event) =>
                                            setData('name', event.target.value)
                                        }
                                        placeholder="macbook-pro"
                                    />
                                    {
                                        errors.name && <p className="text-sm text-red-600">{errors.name}</p>
                                    }
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        name="slug"
                                        tabIndex={2}
                                        value={data.slug}
                                        onChange={(event) =>
                                            setData('slug', event.target.value)
                                        }
                                        placeholder="Laptops"
                                    />
                                    {
                                        errors.slug && <p className="text-sm text-red-600">{errors.slug}</p>
                                    }
                                </div>
                                 <div className="grid gap-2">
                                    <Label htmlFor="category_id">Catageory</Label>
                                    <select
                                        id="category_id"
                                        name="category_id"
                                        tabIndex={3}
                                        value={data.category_id}
                                        onChange={(event) =>
                                            setData('category_id', event.target.value)
                                        }
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    >
                                        {
                                            categories.map((category)=>(
                                                <option value={category.id} key={category.id}>
                                                    {category.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.category_id && <p className="text-sm text-red-600">{errors.category_id}</p>
                                    }
                                </div>
                                    <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        name="description"
                                        tabIndex={4}
                                        value={data.description}
                                        onChange={(event) =>
                                            setData('description', event.target.value)
                                        }
                                        placeholder="Laptops"
                                    />
                                    {
                                        errors.description && <p className="text-sm text-red-600">{errors.description}</p>
                                    }
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        tabIndex={5}
                                        value={data.price}
                                        onChange={(event) =>
                                            setData('price', event.target.value)
                                        }
                                        placeholder="0.00"
                                    />
                                    {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        min="0"
                                        tabIndex={6}
                                        value={data.stock}
                                        onChange={(event) =>
                                            setData('stock', event.target.value)
                                        }
                                        placeholder="0"
                                    />
                                    {errors.stock && <p className="text-sm text-red-600">{errors.stock}</p>}
                                </div>
                                
                              
                                <div className="grid gap-2">
                                    <Label htmlFor="image">Product image</Label>
                                    <Input
                                        id="image"
                                        name="image"
                                        tabIndex={6}
                                        type='file'
                                        onChange={(event) =>
                                            setData('image', event.target.files?.[0] ?? null)
                                        }
                                    />
                                    {
                                        errors.image && <p className="text-sm text-red-600">{errors.image}</p>
                                    }
                                </div>
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        tabIndex={7}
                                        name="status"
                                        checked={data.status}
                                        onChange={(event) =>
                                            setData('status', event.target.checked)
                                        }
                                    />
                                    Active category
                                </label>
                                <div className="flex gap-3">
                                    {editingProduct && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            tabIndex={8}
                                            onClick={resetForm}
                                            disabled={processing}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                    <Button
                                        type="submit"
                                        tabIndex={5}
                                        disabled={processing}
                                    >   

                                      {editingProduct ? 'Update Product' : 'Create Product'}
                                      </Button>
                                </div>
                               
                            </form>
                        </section>
                        <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />    
                    </div>
                </section>
            </div>
        </>
  )
}
Products.layout={
    Breadcrumb:[
        {
            title: 'Products',
            href: '/products'
        }
    ]
}

export default Products